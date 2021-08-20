const express = require('express');
const router = express.Router();
const {asyncErrorHandler} = require('../middleware/index.js');
const {registerUser, loginUser, loginUserGet, logoutUser, indexUser, showUser} = require('../controllers/users.js');


/* GET users listing. */
router.get('/', asyncErrorHandler(indexUser));

/* GET formulario de cadastro */
router.get('/register', function(req,res,next){
  res.render('newUser');
});

/* GET formulario de login */
router.get('/login', function(req,res,next){
  res.render('login');
});

/* GET logout */
router.get('/logout', asyncErrorHandler(logoutUser));

/* POST novo registro */
router.post('/register', asyncErrorHandler(registerUser));

/* POST validacao de login */
router.post('/login', asyncErrorHandler(loginUser));

/* GET mostrar usuario */
router.get('/:uid', asyncErrorHandler(showUser));


/* GET profile */


module.exports = router;
