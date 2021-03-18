const passport = require('passport');      // código para entrar a la sesión 
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, usuario, password, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('Credenciales correctas', 'Bienvenido ' + user.nombre));
    } else {
      done(null, false, req.flash('message', '¡Contraseña Incorrecta!'));
    }
  } else {
    return done(null, false, req.flash('message', 'El usuario introducido no existe.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, usuario, password, done) => {

  const { nombre, apellidos, rol } = req.body;
  let newUser = {
    usuario,
    password,
    nombre,
    apellidos,
    rol
  };
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database    
  console.log(newUser);
  const result = await pool.query('INSERT INTO usuarios SET ? ', newUser);
  newUser.id_usuario = result.insertId;
  return done(null, newUser);
}));


passport.serializeUser((user, done) => {
  done(null, user.id_usuario);
});

passport.deserializeUser(async (id_usuario, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
  done(null, rows[0]);
});

