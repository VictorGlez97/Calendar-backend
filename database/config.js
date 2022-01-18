const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.BD_CNN);

        console.log('DB CONECTED');

    } catch (error) {
        console.log(error);
        throw new Error('ERROR A LA HORA DE CARGAR LA BD')
    }

}

module.exports = { dbConnection }