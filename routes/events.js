const { Router } = require("express");
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos')
const {
    GetEventos,
    CrearEvento,
    ActualizarEvento,
    EliminarEvento
} = require('../controllers/events')

const router = Router();

//VALIDAR EL TOKEN DE TODAS LAS RUTAS
router.use( validarJWT );

//OBTENER EVENTOS
router.get(
    '/', 
    GetEventos);

//CREAR NUEVO EVENTO
router.post(
    '/', 
    [
        check('title', 'ERROR: EL TITULO ES OBLIGATORIO').not().isEmpty(),
        check('start', 'ERROR: FECHA DE INICIO OGLIGATORIA').custom( isDate ),
        check('end', 'ERROR: FECHA DE FIN ES OBLIGATORIA').custom( isDate ),
        //check('user', 'ERROR: ')
        validarCampos
    ],
    CrearEvento);

//ACTUALIZAR EVENTO
router.put(
    '/:id', 
    ActualizarEvento);

//BORRAR EVENTO
router.delete(
    '/:id', 
    EliminarEvento);

module.exports = router;