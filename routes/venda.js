const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const Produto = require('../models/produto');
const Venda = require('../models/venda');
const router = express.Router();

/*  VENDA */
/* GET cadastro vendas. */
router.get('/createVenda', async (req, res, next) => {
  
  try{
    const result1 = await Cliente.find().exec();
    const result2 = await Produto.find().exec();
    res.render('createVenda',{title:'Cadastro de Venda', clientes:result1, produtos:result2});
  }catch (e){
    console.error(e);
  }
});

/* POST cadastro vendas. */
router.post('/createVenda', async (req, res, next) => {
  // busca os dados da anotação do form
  let idCliente = req.body.cboClientes;
  let cliente = await Cliente.findById(idCliente);
  let totalVenda = req.body.inputTotalVenda;
  let dataInput = req.body.inputData;
  //data = new Date(dataInput);
  // cria o objeto e insere no banco. venda conterá o objeto inserido
  let venda = await Venda.create({
    cliente: cliente.nome,
    totalVenda: totalVenda, 
    dataVenda: dataInput
  });
  res.redirect('/venda/listVenda');
});

router.get('/listVenda', async (req, res, next) => {
  try{
   let result = await Venda.find().exec();
   res.render('findAllVenda',{title:'Vendas Cadastradas', vendas:result});
 }catch (e){
   console.error(e);
 }
});

/* GET para buscar venda por cliente */
router.get('/findCliente', async (req,res,next) => {
  let result = await Venda.find({cliente:req.query.inputCliente});
  if (result)
    res.render('findOneVenda',{title:'Pesquisa de Venda por Cliente',vendas:result});
  else
    res.render('notFound',{title:req.query.title});
});

/* GET para buscar venda por ID */
router.get('/findId', async (req,res,next) => {
  let result = await Venda.findById(req.query.inputId);
  if (result)
    res.render('findOneVenda',{title:'Pesquisa de Venda por ID',venda:result});
  else
    res.render('notFound',{title:req.query.title});
});

/* **DELETE** apaga uma venda e volta para home */
router.post('/:id/del', async (req,res,next) => {
  await Venda.findByIdAndRemove(req.params.id);
  res.redirect('/venda/listVenda');
});


/*  fim VENDA */

module.exports = router;