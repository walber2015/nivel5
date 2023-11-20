import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import { Livro } from '../modelo/Livro';
import styles from '../styles/page.module.css';
import { useState, useEffect } from 'react';
import { ControleLivros } from '../classes/ControleLivro';

const LivroLista: React.FC = () => {
  const controleLivros = new ControleLivros('http://localhost:3030/livros');
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  const obterLivros = async () => {
    try {
      const resposta = await fetch(controleLivros.baseURL);
      const dados = await resposta.json();
      setLivros(dados);
    } catch (error) {
      console.error('Erro ao obter livros:', error);
    }
  };

  const excluirLivro = async (codigo: string): Promise<boolean> => {
    try {
      const resposta = await fetch(`${controleLivros.baseURL}/${codigo}`, { method: 'DELETE' });
      return resposta.ok;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      return false;
    }
  };


  const excluir = async (codigo: string) => {
    await controleLivros.excluir(codigo);
    setCarregado(false);
  };


  useEffect(() => {
    if (!carregado) {
      controleLivros.obterLivros().then((dados) => {
        setLivros(dados);
        setCarregado(true);
      });
    }
  }, [carregado, controleLivros]);


  return (
    <div className={styles.container}>
      <Head>
        <title>LivroLista</title>
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={`${index}-${livro.codigo}`} livro={livro} excluir={excluir} />
            ))}

          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
