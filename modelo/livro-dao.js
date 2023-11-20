const Livro = require('./livro-schema');

const obterLivros = async () => {
    try {
        const livros = await Livro.find();
        return livros;
    } catch (error) {
        console.error('Erro ao obter livros:', error.message);
        throw error;
    }
};

const incluirLivro = async (livroData) => {
    try {
        const novoLivro = await Livro.create(livroData);
        return novoLivro;
    } catch (error) {
        console.error('Erro ao incluir livro:', error.message);
        throw error;
    }
};
const excluirLivro = async (codigo) => {
    try {
        const resultado = await Livro.deleteOne({ _id: codigo });
        return resultado;
    } catch (error) {
        console.error('Erro ao excluir livro:', error.message);
        throw error;
    }
};
module.exports = {
    obterLivros,
    incluirLivro,
    excluirLivro
};
