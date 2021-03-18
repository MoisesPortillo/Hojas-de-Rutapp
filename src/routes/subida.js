const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('subida/add');
    
});

module.exports = router;