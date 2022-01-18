const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    //console.log(token);
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'ERROR: NO HAY TOKEN EN LA PETICIÓN'
        });
    }

    try {
        
        const payload = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        // console.log(payload);

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'ERROR: TOKEN NO VALIDO'
        })
    }


    next();

}

module.exports = {
    validarJWT
}