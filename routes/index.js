const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/note');
const Cliente = require('../models/cliente');
const router = express.Router();


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
/* GET lista de notas. */
router.get('/list', async (req, res, next) => {
  // mongoose permite usar async/await, então a função callback (que estamos) precisa ser definida como async para poder dizer qual comando deve ser 'awaitado'
  try{
    let result = await Note.find().exec();
    res.render('findAll',{title:'Mongo', notes:result});
  }catch (e){
    console.error(e);
  }
});
/* GET create new note form. */
router.get('/create', function(req, res, next) {
  res.render('create',{title:'Mongo'});
});
/* POST salva anotação e volta para lista */
router.post('/', async (req,res,next) =>{
  // busca os dados da anotação do form
  let titulo = req.body.inputTitulo;
  let conteudo = req.body.inputConteudo;
  // cria o objeto e insere no banco. nota conterá o objeto inserido
  let nota = await Note.create({
    title: titulo,
    content: conteudo
  });
  res.redirect(`/${nota.id}`);
});
/* GET search note form. */
router.get('/find', function(req, res, next) {
  res.render('findOneForm',{title:'Mongo'});
});
/* GETs para busca por título ou número da anotação. */
router.get('/ft', async (req,res,next) => {
  let result = await Note.findOne({title:req.query.inputTitulo});
  if (result)
    res.render('findOne',{title:'Mongo',note:result});
  else
    res.render('notFound',{titulo:req.query.titulo});
});
/* GETs para busca por título ou número da anotação. */
router.get('/fn', async (req,res,next) => {
  // o _id criado automaticamente pelo Mongo não corresponde a um "número". Seria necessário criar um objeto para poder comparar o id.
  res.render('notFound',{numero:req.query.numero});
});
/* GET para mostrar uma anotação (e opções) */
router.get('/:id', async function(req, res, next) {
  let result = await Note.findById(req.params.id);
  if (result)
    res.render('findOne',{title:'Mongo', note:result});
  else
    res.render('notFound',{numero:req.query.numero});
  
});
/* **DELETE** apaga uma anotação e volta para lista */
router.post('/:id/del', async (req,res,next) => {
  await Note.findByIdAndRemove(req.params.id);
  res.redirect('/list');
});
/* GET altera uma anotação e volta para ela mesma */
router.get('/:id/edit', async (req,res,next) => {
  let noteToChange = await Note.findById(req.params.id);
  res.render('editOneForm',{title:'Mongo',note:noteToChange});
});
/* **PUT** altera uma anotação e volta para ela mesma */
router.post('/:id/edit', async (req,res,next) => {
  let noteToChange = await Note.findById(req.params.id);
  noteToChange.title = req.body.inputTitulo;
  noteToChange.content = req.body.inputConteudo;
  await Note.findByIdAndUpdate(noteToChange.id, noteToChange, {new:true});
  res.redirect(`/${req.params.id}`);
});

module.exports = router;