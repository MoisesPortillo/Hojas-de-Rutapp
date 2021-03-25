const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('rutas/add');
});

router.post('/add', async (req, res) => {
    const { fecha, id_furgo, origen, destino, dietas, festivo, kilometros, incidencias } = req.body;
    const newRuta = {
        fecha,
        id_furgo,
        origen,
        destino,
        dietas,
        festivo,
        kilometros,
        incidencias,
        id_usuario: req.user.id_usuario
    };
    await pool.query('INSERT INTO rutas set ?', [newRuta]);
    req.flash('success', 'Nueva ruta guardada correctamente');
    res.redirect('/rutas');
});

router.get('/', isLoggedIn, async (req, res) => {

   const lrutas = await pool.query('SELECT id_ruta,date_format(rutas.fecha,"%d %m %Y") AS fecha,origen,destino,dietas,kilometros,incidencias,created_at FROM rutas WHERE id_usuario = ?', [req.user.id_usuario]);
    console.log(lrutas);
    res.render('rutas/list', { lrutas });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM rutas WHERE id_ruta = ?', [id]);
    req.flash('success', 'Ruta borrada correctamente');
    res.redirect('/rutas');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
//    console.log(id);
    const rutas = await pool.query('SELECT * FROM rutas WHERE id_ruta = ?', [id]);
   console.log(rutas);
    res.render('rutas/edit', {ruta: rutas[0]});
});



router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, id_furgo, origen, destino, dietas, festivo, kilometros, incidencias} = req.body; 
    const editRuta = {
        fecha,
        id_furgo,
        origen,
        destino,
        dietas,
        festivo,
        kilometros,
        incidencias
    };
       console.log(editRuta);
    if (editRuta.dietas == "SI")
        {editRuta.dietas = true}
        else
        {editRuta.dietas = false};
    if (editRuta.festivo == "SI")
        {editRuta.festivo = true}
        else
        {editRuta.festivo = false}; 
    
    await pool.query('UPDATE rutas set ? WHERE id_ruta = ?', [editRuta, id]);
    req.flash('success', 'Ruta correctamente actualizada');
    res.redirect('/rutas');
    });

    router.get('/detalle/:id', async (req, res) => {

    const {id} = req.params
   const list_hr = await pool.query('SELECT rutas.origen,rutas.destino,date_format(rutas.fecha,"%d %m %Y") AS fecha, usuarios.nombre,furgonetas.matricula,furgonetas.marca,furgonetas.modelo,rutas.kilometros,rutas.incidencias FROM rutas,usuarios,furgonetas WHERE rutas.id_ruta=? and usuarios.id_usuario=rutas.id_usuario and furgonetas.id_furgo=rutas.id_furgo;', [id]);
    console.log (list_hr)

    res.render('rutas/detalle', {list_hr});

});

module.exports = router;
