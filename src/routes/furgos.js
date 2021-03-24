const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('furgos/add');
    //res.send('Hello furgos');
});

router.post('/add', async (req, res) => {
    const { id_furgo, matricula, marca, modelo, kilometros } = req.body;
    const newFurgo = {
        matricula,
        marca,
        modelo,
        kilometros,
         };
    await pool.query('INSERT INTO furgonetas set ?', [newFurgo]);
    req.flash('success', '¡Registro de furgoneta completado!');
    res.redirect('/furgos');
});

router.get('/', isLoggedIn, async (req, res) => {
  //  const furgos = await pool.query('SELECT * FROM furgos WHERE id_furgo = ?', [req.id.furgo]);  
  const furgos = await pool.query('SELECT * FROM furgonetas');
  console.log (furgos)
  res.render('furgos/list', { furgos });
});

router.get('/delete/:id_furgo', async (req, res) => {
    const { id_furgo } = req.params;
    console.log(id_furgo)
    await pool.query('DELETE FROM furgonetas WHERE id_furgo = ?', [id_furgo]);
    req.flash('success', 'Furgoneta eliminada correctamente');
    res.redirect('/furgos');
});

router.get('/edit/:id_furgo', async (req, res) => {
    const { id_furgo } = req.params;
    console.log(id_furgo)
    const furgos = await pool.query('SELECT * FROM furgonetas WHERE id_furgo = ?', [id_furgo]);
    console.log(furgos[0]);
    res.render('furgos/edit', {furgo: furgos[0]});
});

router.post('/edit/:id_furgo', async (req, res) => {
    const { id_furgo } = req.params;
    const { marca, modelo, matricula, kilometros} = req.body; 
    const newFurgo = {
        marca,
        modelo,
        matricula,
        kilometros
    };
    await pool.query('UPDATE furgonetas set ? WHERE id_furgo = ?', [newFurgo, id_furgo]);
    console.log(newFurgo);
    req.flash('success', '¡Furgonetas dada de alta correctamente!');
    res.redirect('/furgos');
});

module.exports = router;
