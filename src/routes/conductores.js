const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../database');
const { isLoggedIn} = require('../lib/auth');



// SIGNUP
router.get('/add', (req, res) => {
    res.render('conductores/add');
  });
  
  router.post('/add', passport.authenticate('local.signup', {
    successRedirect: '/list',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  
  // SINGIN
  router.get('/add', (req, res) => {
    res.render('auth/signin');
  });
  
router.get('/add', (req, res) => {
    res.render('conductores/add');
});                                  


router.post('/add', async (req, res) => {               
const {  } = req.body;
    const newLink = {
        user_id: req.user.id
    };


    await pool.query('INSERT INTO rutas set ?', [newLink]);
    req.flash('success', '¡Alta correcta!');
    res.redirect('/conductores');
});

router.get('/', isLoggedIn, async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');
    res.render('conductores/list', { usuarios });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    req.flash('success', 'Usuario eliminado correctamente');
    res.redirect('/conductores');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const rusuario = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    console.log(rusuario);
    res.render('conductores/edit', {usuario: rusuario[0]});
});


module.exports = router;


