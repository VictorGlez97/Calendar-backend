const { response } = require('express');
const Evento = require('../models/Evento');

const GetEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user','name');
                                //.populate('user','name password')

    res.json({
        ok: true,
        eventos
    })

}

const CrearEvento = async ( req, res = response ) => {

    // VERIFICAR QUE TENGA EL EVENTO
    // console.log( req.body );

    const evento = new Evento( req.body );

    try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADMINISTRADOR'
        });
    }

}

const ActualizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById( eventoId );
        
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'ERROR: ESTE EVENTO NO EXISTE'
            })
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'ERROR: NO TIENE PRIVILEGIOS PARA PODER EDITAR EL EVENTO'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADMINISTRADOR'
        });
    }

}

const EliminarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Evento.findById(eventoId);

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'ERROR: EVENTO NO ENCONTRADO'
            })
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'ERROR: NO TIENE PERMISOS PARA ELIMINAR ESTE EVENTO'
            })
        }

        //await Evento.findByIdAndDelete( eventoId );
        await Evento.remove({ _id: eventoId });

        res.status(201).json({
            ok: true,
            msg: 'EXITO: EVENTO ELIMINADO CORRECTAMENTE'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADMINISTRADOR'
        });
    }

    res.json({
        ok: true,
        msg: 'EliminarEvento'
    })

}

module.exports = {
    GetEventos,
    CrearEvento,
    ActualizarEvento,
    EliminarEvento
}