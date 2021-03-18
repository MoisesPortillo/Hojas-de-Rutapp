const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const multer = require('multer');

 upload = multer({dest: './src/public/uploads'}); // ***MULTER 09/02


const { database } = require('./keys');

// Intializations
const app = express();
require('./lib/passport');


// STORAGE DE MULTER ( PARA PONER ARCHIVOS CON SU NOMBRE)
storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'src/public/uploads') // Agregamos el directorio donde se guardarán los archivos.
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname) // Le pasamos el nombre original del archvio, también podriamos cambiar el nombre concatenando la fecha actual.
  }
  
}),
upload = multer({storage}), // Cambiamos el atributo dest por el storage.

//MULTER

app.post('/subir', upload.single('archivo'), (req, res) => { // subir
  console.log(req.file) // Nos devuelve un objeto con la información de nuestro archivo
  res.send(' subido correctamente')
    })

  
// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
 secret: 'moises',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/rutas', require('./routes/rutas'));
app.use('/conductores', require('./routes/conductores')); // nueva carpeta de conductores para crear conductores
app.use('/furgos', require('./routes/furgos'));// nueva de furgos
app.use('/subida', require('./routes/subida'));// subida
app.use('/descarga', require('./routes/descarga'));// subida
app.use(express.static('public/uploads'));  // Da permiso para acceder a carpeta
// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});










