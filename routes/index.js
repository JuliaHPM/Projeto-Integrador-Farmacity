const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const Produto = require('../models/produto');
const Venda = require('../models/venda');
const router = express.Router();

router.get('/teste', (req, res, next) => {
  res.render('testeTabela');
  
});

/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.session){
    console.log("sessao:");
    console.dir(req.session)
    if(req.user){
      console.log("Usuário:");
      console.dir(req.user)
    }
  }
  res.render('index', { title: 'Farmacity' });
});


module.exports = router;