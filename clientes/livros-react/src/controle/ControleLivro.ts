
import { Livro } from '../modelo/Livro';
import { Error } from 'mongoose';

interface LivroMongo {
  _id: string | null;
  titulo: string;
  codEditora: number;
  resumo: string;
  autores: string[];
}

class ControleLivros {
  private baseURL: string = 'http://localhost:3030/livros';

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async obterLivros(): Promise<Livro[]> {
    try {
      const response = await fetch(this.baseURL);

      if (!response.ok) {
        throw new Error(`Erro ao obter livros: ${response.status} - ${response.statusText}`);
      }

      const livrosJson = await response.json();


      const livros: Livro[] = livrosJson.map((livro: any) => {
        return {
          codigo: livro._id,
          titulo: livro.titulo,
          codEditora: livro.codEditora,
          resumo: livro.resumo,
          autores: livro.autores,
        };
      });

      return livros;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async incluir(livro: Livro): Promise<boolean> {
    try {
      const livroMongo: LivroMongo = {
        _id: null,
        titulo: livro.getTitulo(),
        codEditora: livro.getCodEditora(),
        resumo: livro.getResumo(),
        autores: livro.getAutores(),
      };

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroMongo),
      });

      return response.ok;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async excluir(codigo: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/${codigo}`, {
        method: 'DELETE',
      });

      return response.ok;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { ControleLivros };
