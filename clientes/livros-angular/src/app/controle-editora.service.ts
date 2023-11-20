import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  private editoras: Array<Editora>;

  constructor() {
    this.editoras = [
      new Editora(0, "Alta Books"),
      new Editora(1, "Pearson"),
      new Editora(2, "Addison Wesley")
    ];
  }

  getEditoras(): Array<Editora> {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string {
    const editoraEncontrada = this.editoras.find(editora => editora.getCodEditora() == codEditora);


    return editoraEncontrada ? editoraEncontrada.getNome() : 'Editora não encontrada';
  }
}
