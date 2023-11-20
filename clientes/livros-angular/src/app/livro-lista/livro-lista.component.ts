import { Component, OnInit } from '@angular/core';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Livro } from '../livro';
import { Editora } from '../editora';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) { }

  async ngOnInit(): Promise<void> {
    this.editoras = this.servEditora.getEditoras();

    try {
      this.livros = await this.servLivros.obterLivros();
    } catch (error) {
      console.error('Erro ao obter livros:', error);
    }
  }

  excluir = async (codigo: string): Promise<void> => {
    try {
      await this.servLivros.excluir(codigo);
      this.livros = await this.servLivros.obterLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  obterNome = (codEditora: number): string => {
    return this.servEditora.getNomeEditora(codEditora);
  };
}
