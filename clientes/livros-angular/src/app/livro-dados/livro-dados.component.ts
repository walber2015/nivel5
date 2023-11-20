import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Livro } from '../livro';
import { Editora } from '../editora';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro;
  public autoresForm: string = '';
  public editoras: Array<Editora> = [];
  public titulo: string = '';
  public codEditora: number = 0;
  public resumo: string = '';


  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.livro = new Livro('', 0, '', '', []);
  }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }


  incluir = (): void => {
    this.livro.setTitulo(this.titulo);
    this.livro.setResumo(this.resumo);
    this.livro.setCodEditora(this.codEditora);
    this.livro.setAutores(this.autoresForm.split('\n'));

    this.servLivros.incluir(this.livro)
      .then(() => {
        this.router.navigateByUrl('/lista');
      })
      .catch((error) => {
        console.error('Erro ao incluir livro:', error);
      });
  };
}
