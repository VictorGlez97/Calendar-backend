const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

//console.log( process.env );

//CREAR EL SERVIDOR DE EXPRESS
const app = express();

//BASE DE DATOS
dbConnection();

// CORS
app.use(cors());

//DIRECTORIO PUBLICO
app.use( express.static('public') );

//LECTURA Y PARSEO DEL BODY
app.use( express.json() );

//RUTAS
//TODO: AUTH // CREAR, LOGIN, RENEW
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: EVENTOS

// ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.PORT}`);
})