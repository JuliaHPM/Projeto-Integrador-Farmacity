const express = require('express');
const mongoose = require('mongoose');
//const Note = require('../models/note');
const Cliente = require('../models/cliente');
const router = express.Router();

/* GET home page. --> get pagina de configuracao de clientes? */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Farmacity' });
});

/* GET lista de clientes. */
router.get('/listCliente', async (req, res, next) => {
  // mongoose permite usar async/await, então a função callback (que estamos) precisa ser definida como async para poder dizer qual comando deve ser 'awaitado'
  try{
    let result = await Cliente.find().exec();
    res.render('findAllCliente',{title:'Clientes Cadastrados', clientes:result});
  }catch (e){
    console.error(e);
  }
});

/* GET chama o formulario de Cadastro de Cliente */
router.get('/createCliente', function(req, res, next) {
  res.render('createCliente',{title:'Cadastro de Cliente'});
});

/* POST salva anotação e volta para lista */
router.post('/', async (req,res,next) =>{
  // busca os dados da anotação do form
  let nome = req.body.inputNome;
  let email = req.body.inputEmail;
  let data_nasc = req.body.inputData_nasc;
  let telefone = req.body.inputTelefone;
  let cpf = req.body.inputCpf;
  let rg = req.body.inputRg;

  // cria o objeto e insere no banco. cliente conterá o objeto inserido
  let cliente = await Cliente.create({
    nome: nome,
	  email: email,
	  data_nasc: data_nasc,
	  telefone: telefone,
	  cpf: cpf,
	  rg: rg
  });
  res.redirect(`cliente/${cliente.id}`);
});

/* GET formulário de pesquisa de cliente */
router.get('/findCliente', function(req, res, next) {
  res.render('findOneFormCliente',{title:'Pesquisar Cliente'});
});

/* GET para busca por cpf do cliente */
router.get('/findCpf', async (req,res,next) => {
  let result = await Cliente.findOne({cpf:req.query.inputCpf});
  if (result)
    res.render('findOneCliente',{title:'Pesquisa',cliente:result});
  else
    res.render('notFound',{cpf:req.query.cpf});
});

/* GET para busca por cpf do cliente */
router.get('/findNome', async (req,res,next) => {
  let result = await Cliente.findOne({nome:req.query.inputNome});
  if (result)
    res.render('findOneCliente',{title:'Pesquisa',cliente:result});
  else
    res.render('notFound',{nome:req.query.nome});
});


/* GETs para busca por título ou número da anotação. 
router.get('/fn', async (req,res,next) => {
  // o _id criado automaticamente pelo Mongo não corresponde a um "número". Seria necessário criar um objeto para poder comparar o id.
  res.render('notFound',{numero:req.query.numero});
});*/

/* GET para mostrar um cliente (e opções) */
router.get('/:id', async function(req, res, next) {
  let result = await Cliente.findById(req.params.id);
  if (result)
    res.render('findOneCliente',{title:'Cliente', cliente:result}); //cliente refere-se à models/cliente.js?!
  else
    res.render('notFound',{numero:req.query.numero});
});

/* **DELETE** apaga um cliente e volta para lista */
router.post('/:id/del', async (req,res,next) => {
  await Cliente.findByIdAndRemove(req.params.id);
  res.redirect('cliente/listCliente');
});

/* GET chama o edit */
router.get('/:id/edit', async (req,res,next) => {
  let clienteToChange = await Cliente.findById(req.params.id);
  res.render('editOneFormCliente',{title:'Editar Cliente',cliente:clienteToChange});
});

/* **PUT** altera um cliente e volta para ele mesmo */
router.post('/:id/edit', async (req,res,next) => {
  let clienteToChange = await Cliente.findById(req.params.id);
  clienteToChange.nome = req.body.inputNome;
  clienteToChange.email = req.body.inputEmail;
  clienteToChange.data_nasc = req.body.inputData_nasc;
  clienteToChange.telefone = req.body.inputTelefone;
  clienteToChange.cpf = req.body.inputCpf;
  clienteToChange.rg = req.body.inputRg;
  await Cliente.findByIdAndUpdate(clienteToChange.id, clienteToChange, {new:true});
  res.redirect(`/cliente/${req.params.id}`);
});

module.exports = router;