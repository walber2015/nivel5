import { NextApiRequest, NextApiResponse } from 'next';
import controleLivro from '../../../classes/ControleLivroSingleton';

//const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const codigo = req.query.codigo as string;
      controleLivro.excluir(codigo);
      res.status(200).json({ mensagem: 'Livro excluído com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
  } else {
    res.status(405).end();
  }
};
