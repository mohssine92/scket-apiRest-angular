
// este es erachivo donde vamos a crear nuestros APIRESTFUl

import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

// TODO: la magia aqui connectar nuestros servicios Rest con servidor de sockets


const router = Router(); // Router es una funcion me permite crear objetos de tipo router - occupo para crear mis api endpoints o mi servicio rest 


// ars : path , handler en pocas palabras la funcion que va manejar esta peticion 
router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});


router.post('/mensajes', ( req: Request, res: Response  ) => {
   
    const {cuerpo, de }  = req.body;

    const payload = { cuerpo, de };

    const server = Server.instance;
    // mandar todos clientes conectado al server de socket
    server.io.emit('mensaje-nuevo', payload ); 
   

    res.json({
        ok: true,
        cuerpo,
        de
    }); 

});


// :id deberia ser id del usaurio a quien quiero mandar mensaje
router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const { cuerpo, de  } = req.body;
    const { id } = req.params;

    console.log(id);
    
    const payload = {
        de,
        cuerpo
    }

    


    // como es singlton tenemos la msima instancia que esta corriendo en servidor de node .
    const server = Server.instance; 

    // referir a nuestro servidor de socket 
    // in emite a un usuario encuentre en un canal en particular : sala . cada user conectar al serversocket su id es su sala tambien 
    server.io.in( id ).emit('mensaje-privado', payload);


    // Rnviar a todo el mundo 
    //server.io.emit('mensaje-privado', payload);
   
   
  

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', async (  req: Request, res: Response ) => {

    const server = Server.instance; // instace of my server singlton 

    const idsSockets = await server.io.allSockets(); // ver video 51 comentarios - captura pantaalla otro ordenador - 

    //console.log(Array.from(idsSockets))

    try {

        res.json({
            ok: true,
            clients: Array.from(idsSockets)
            // ids sockets : clients connected . pude ser un user hace varias instancias asi varios ids socket
        });
        
    } catch (error) {

        return res.json({
            ok: false,
            error
        })

    }

    // TODO:  estos son ids de socktes de clientes conectados al servidor en el momento de la peticioon , refresh a nav puede actualizar id del cliente , nos sirve este id a emitir a los clientes 
   // un payload en tiempo real .
  // esto solo indica los ids conectados pero nasabemos de quien son , para saber aqui interviene db , update idsocket - si el cliente se desconecta al socket pierde la notificacion no la va a recibir 
  // se trata de realtime - 

});



// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
   // TODO: aqui obtenemos detalles sobre clientes connectados , usamos nuestra clase como memoria - en preyecto real debe ser modelo para comunicar con mysql o mongodb , postgreal .
   // alli vamos crendo mas referencias segun  necesidades mas relaciones props etc etc ..  
});




export default router;


// TODO: estos servicios rest me ofrecen que otras personas que no estan conectados al socket directamente puedan mandar informacion , y en que tiempo real nuestros usuarios conectados mediante socket 
// se den cuenta del eventos disparados por core de APIREST 