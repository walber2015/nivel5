const express = require('express');
const router = express.Router();
const LivroDAO = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
    try {
        const livros = await LivroDAO.obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter livros' });
    }
});

router.post('/', async (req, res) => {
    const novoLivro = req.body;
    try {
        const livroIncluido = await LivroDAO.incluirLivro(novoLivro);
        res.json({ message: 'Livro incluído com sucesso', livro: livroIncluido });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao incluir livro' });
    }
});

router.delete('/:codigo', async (req, res) => {
    const codigoLivro = req.params.codigo;
    try {
        const resultado = await LivroDAO.excluirLivro(codigoLivro);
        if (resultado.deletedCount > 0) {
            res.json({ message: 'Livro excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Livro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir livro' });
    }
});

module.exports = router;
