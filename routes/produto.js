const express = require('express');
const mongoose = require('mongoose');
//const Note = require('../models/note');
const Produto = require('../models/produto');
const router = express.Router();

/* GET home page. --> get pagina de configuracao de clientes? */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Farmacity' });
});

/* GET lista de produtos. */
router.get('/listProduto', async (req, res, next) => {
  // mongoose permite usar async/await, então a função callback (que estamos) precisa ser definida como async para poder dizer qual comando deve ser 'awaitado'
  try{
    let result = await Produto.find().exec();
    res.render('findAllProduto',{title:'Produtos Cadastrados', produtos:result});
  }catch (e){
    console.error(e);
  }
});

/* GET chama o formulario de Cadastro de Produto */
router.get('/createProduto', function(req, res, next) {
  res.render('createProduto',{title:'Cadastro de Produto'});
});

/* POST salva anotação e volta para lista */
router.post('/', async (req,res,next) =>{
  // busca os dados da anotação do form
  let nome = req.body.inputNome;
  let descricao = req.body.inputDescricao;
  let marca = req.body.inputMarca;
  let categoria = req.body.inputCategoria;
  let preco = req.body.inputPreco;
  let quantidade = req.body.inputQuantidade;

  // cria o objeto e insere no banco. cliente conterá o objeto inserido
  let produto = await Produto.create({
    nome: nome,
	  descricao: descricao,
	  marca: marca,
	  categoria: categoria,
	  preco: preco,
	  quantidade: quantidade
  });
  res.redirect(`produto/${produto.id}`);
});

/* GET formulário de pesquisa de produto */
router.get('/findProduto', function(req, res, next) {
  res.render('findOneFormProduto',{title:'Pesquisar Produto'});
});

/* GET para busca por marca do produto */
router.get('/findMarca', async (req,res,next) => {
  let result = await Produto.findOne({marca:req.query.inputMarca});
  if (result)
    res.render('findOneProduto',{title:'Pesquisa por Marca',produto:result});
  else
    res.render('notFound',{marca:req.query.marca});
});

/* GET para busca por nome do produto */
router.get('/findNome', async (req,res,next) => {
  let result = await Produto.findOne({nome:req.query.inputNome});
  if (result)
    res.render('findOneProduto',{title:'Pesquisa por Nome',produto:result});
  else
    res.render('notFound',{nome:req.query.nome});
});

/* GET para busca por nome do produto */
router.get('/findCategoria', async (req,res,next) => {
  let result = await Produto.findOne({categoria:req.query.inputCategoria});
  if (result)
    res.render('findOneProduto',{title:'Pesquisa por Categoria',produto:result});
  else
    res.render('notFound',{nome:req.query.nome});
});


/* GET para mostrar um produto (e opções) */
router.get('/:id', async function(req, res, next) {
  let result = await Produto.findById(req.params.id);
  if (result)
    res.render('findOneProduto',{title:'Produto', produto:result}); //produto refere-se à models/produto.js?!
  else
    res.render('notFound',{id:req.query.id});
});

/* **DELETE** apaga um produto e volta para lista */
router.post('/:id/del', async (req,res,next) => {
  await Produto.findByIdAndRemove(req.params.id);
  res.redirect('produto/listProduto');
});

/* GET chama o edit */
router.get('/:id/edit', async (req,res,next) => {
  let produtoToChange = await Produto.findById(req.params.id);
  res.render('editOneFormProduto',{title:'Editar Produto', produto:produtoToChange});
});

/* **PUT** altera um produto e volta para ele mesmo */
router.post('/:id/edit', async (req,res,next) => {
  let produtoToChange = await Produto.findById(req.params.id);
  produtoToChange.nome = req.body.inputNome;
  produtoToChange.descricao = req.body.inputDescricao;
  produtoToChange.marca = req.body.inputMarca;
  produtoToChange.categoria = req.body.inputCategoria;
  produtoToChange.preco = req.body.inputPreco;
  produtoToChange.quantidade = req.body.inputQuantidade;
  await Produto.findByIdAndUpdate(produtoToChange.id, produtoToChange, {new:true});
  res.redirect( `/produto/${req.params.id}`);
});

module.exports = router;