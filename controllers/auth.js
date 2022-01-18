const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const CrearUsuario = async ( req, res = response ) => {
    
    const { email, password } =  req.body

    try {

        let usuario = await Usuario.findOne({ email });
        //console.log( usuario );

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: UN USUARIO YA ESTA REGISTRADO CON ESE CORREO'
            })
        }

        usuario = new Usuario( req.body );

        //ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

            //GENERAR JWT
            const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: POR FAVOR HABLE CON EL ADMINISTRADOR'
        })
    }
}

const LoginUsuario = async( req, res = response ) => {
    
    const { email, password } =  req.body

    try {

        let usuario = await Usuario.findOne({ email });
        //console.log( usuario );

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: CORREO INCORRECTO'
            })
        }

        //VALIDAR PASSWORD
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: CLAVE INCORRECTA'
            })
        }

        //GENERAR JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: POR FAVOR HABLE CON EL ADMINISTRADOR'
        })
    }

}

const RevalidarToken = async ( req, res = response ) => {
    
    const { uid, name } = req;

    // GENERAR JWT
    const token = await generarJWT( uid, name );
    
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    CrearUsuario,
    LoginUsuario,
    RevalidarToken
}