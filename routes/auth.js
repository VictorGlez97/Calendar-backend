/* 
    RUTAS DE USUARIOS / AUTH
    HOST + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const { 
    CrearUsuario,
    LoginUsuario,
    RevalidarToken 
} = require('../controllers/auth');

router.post(
    '/new',
    [ // MIDDLEWARES
        check('name', 'ERROR: EL NOMBRE ES OBLIGATORIO').not().isEmpty(),
        check('email', 'ERROR: EL CORREO ES OBLIGATORIO').isEmail(),
        check('password', 'ERROR: LA CONTRASEÑA ES OBLIGATORIO').not().isEmpty(),
        check('password', 'ERROR: LA CONTRASEÑA DEBE DE SER MINIMO 6 CARACTERES').isLength({ min: 6 }),
        validarCampos
    ], 
    CrearUsuario);

router.post(
    '/',
    [ // MIDDLEWARES
        check('email', 'ERROR: EL CORREO ES OBLIGATORIO').isEmail(),
        check('password', 'ERROR: LA CONTRASEÑA ES OBLIGATOIA').not().isEmpty(),
        check('password', 'ERROR: LA CONTRASEÑA DEBE SER MINIMO 6 CARACTERES ').isLength({ min: 6 }),
        validarCampos
    ], 
    LoginUsuario);

router.get('/renew', validarJWT, RevalidarToken);

module.exports = router;