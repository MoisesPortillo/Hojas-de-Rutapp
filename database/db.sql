CREATE DATABASE bd_rutas;

USE bd_rutas;

-- TABLA USUARIOS
CREATE TABLE usuarios (
  id_usuario INT(11) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellidos VARCHAR(60) NOT NULL,
  rol tinyint(1) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id_usuario);

ALTER TABLE usuarios
  MODIFY id_usuario INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE usuarios;

SELECT * FROM usuarios;

-- TABLA FURGONETAS
CREATE TABLE furgonetas (
  id_furgo INT(11),
  matricula VARCHAR(8) NOT NULL,
  marca VARCHAR(30) NOT NULL,
  modelo VARCHAR(30) NOT NULL,
  kilometros INT(5) NOT NULL
);

ALTER TABLE furgonetas
  ADD PRIMARY KEY (id_furgo);

ALTER TABLE furgonetas
  MODIFY id_furgo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE furgonetas;

-- TABLA HOJAS DE RUTA
CREATE TABLE rutas (
  id_ruta INT (11) NOT NULL,
  id_usuario INT(11) NOT NULL,
  id_furgo INT(11) NOT NULL,
  fecha DATE NOT NULL,
  origen VARCHAR(100) NOT NULL,
  destino VARCHAR(100) NOT NULL,
  kilometros INT(5) NOT NULL,
  dietas tinyint (1) NOT NULL,
  festivo tinyint (1) NOT NULL,
  incidencias TEXT,   
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_usuario FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_furgo FOREIGN KEY(id_furgo) REFERENCES furgonetas(id_furgo) ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE rutas
  ADD PRIMARY KEY (id_ruta);

ALTER TABLE rutas
  MODIFY id_ruta INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE rutas;

