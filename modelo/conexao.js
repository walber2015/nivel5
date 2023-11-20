
const banco = require('mongoose');


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};


banco.connect('mongodb://localhost/livraria', options)
    .then(() => {
        console.log('Conexão com o MongoDB estabelecida com sucesso');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);
    });

module.exports = banco;
