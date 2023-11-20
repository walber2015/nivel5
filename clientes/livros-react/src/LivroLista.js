import React, { useState, useEffect } from 'react';
import { ControleEditora } from './controle/ControleEditora';

function LinhaLivro({ livro, excluir }) {
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td className="d-flex flex-column">
                {livro.titulo}
                <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>

            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={`${index}-${autor}`}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}


export default function LivroLista({ controleLivro }) {
    const [livros, setLivros] = useState([]);
    console.log(livros);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            controleLivro.obterLivros().then((novosLivros) => {
                setLivros(novosLivros);
                setCarregado(true);
            }).catch((erro) => {
                console.error('Erro ao obter livros:', erro);
            });
        }
    }, [carregado, controleLivro]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo)
            .then((sucesso) => {
                if (sucesso) {
                    const livrosRestantes = livros.filter((livro) => livro.codigo !== codigo);
                    setLivros(livrosRestantes);
                }
            })
            .catch((erro) => {
                console.error('Erro ao excluir livro:', erro);
            })
            .finally(() => {
                setCarregado(false);
            });
    };


    return (
        <div>
            <main class="container">
                <h1>Catálogo de Livros</h1>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Resumo</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Autores</th>

                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <LinhaLivro livro={livro} key={livro.codigo} excluir={excluir} />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
