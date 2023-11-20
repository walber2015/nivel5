export class Livro {
    codigo: string;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];


    constructor(codigo: string, codEditora: number, titulo: string, resumo: string, autores: string[]) {
        this.codigo = codigo;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;
    }
    getCodigo(): string {
        return this.codigo;
    }

    setCodigo(codigo: string): void {
        this.codigo = codigo;
    }

    getCodEditora(): number {
        return this.codEditora;
    }

    setCodEditora(codEditora: number): void {
        this.codEditora = codEditora;
    }

    getTitulo(): string {
        return this.titulo;
    }

    setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    getResumo(): string {
        return this.resumo;
    }

    setResumo(resumo: string): void {
        this.resumo = resumo;
    }

    getAutores(): string[] {
        return this.autores;
    }

    setAutores(autores: string[]): void {
        this.autores = autores;
    }

}
