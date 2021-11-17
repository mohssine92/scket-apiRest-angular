
import  socketIO , { Socket } from 'socket.io';


import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';




// unica instancia que debo manejar de mis usuarios connectados - se reinstancia solo cuando calle el servidor de nodejs . NO cuando socketserver pierde conexion con el cliente
export const usuariosConectados = new UsuariosLista();



// grabar objeto cliente conectado en una coleccion 
export const conectarCliente = ( cliente: Socket, io:socketIO.Server ) => {

  const usuario = new Usuario( cliente.id );
  usuariosConectados.agregar( usuario );

  
  // serevrsocket --> all client    
//  io.emit('usuarios-activos' , usuariosConectados.getLista()  ); // no va incluye id sockets client sin nombre recien filtrado

 

}

// delete object cliente de la coleccion cuando el mismo se desconecta
export const desconectar = ( cliente: Socket , io:socketIO.Server ) => {

  // cuando cliente pierde conexion al servidor 
  cliente.on('disconnect', () => {

       console.log(`client disconnected ${cliente.id}`) 
       usuariosConectados.borrarUsuario( cliente.id );   
   
       // server emit event to client
       io.emit('usuarios-activos', usuariosConectados.getLista() );
   
  })

  

}


export const mensaje = ( cliente: Socket , io:socketIO.Server ) => { // io es mi servidor 
  


  // received custom message from  instance cliente 
  
  cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
     
    console.log('message received ' , payload )

    io.emit('mensaje-nuevo', payload) // servidor emit a todos clientes connectados 
  }) 


 
}


// opdate object cliente 
export const configurarUusuario = ( cliente: Socket , io:socketIO.Server) =>  {

  cliente.on('configurar-usuario', ( payload : { nombre: string } , callback: Function  ) => {
     
    /* manejar de algun manera los clientes conectados , lo manejamos dentro de una clase porque si cliente hace refresh esto genera nueva comunicacion mediante sockets 
        por secuencia genera nuevo id del socket .si tenemos 1000 usuarios alli seria conviniente grabarlos en db . el procidemiento seria el mismo - o identificarlos mediante jwt
     */


    usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
    console.log(`client configured ${cliente.id} with name ${payload.nombre}`)

    // notificar front-end de la lista 
    io.emit('usuarios-activos',usuariosConectados.getLista() );
  
    callback({ // la recibe solo el cliente emtente del event - podemos usar if else , returnamos callback de err despues de validar algo en el scope 
        ok: true,
        mensaje: `Usuario ${ payload.nombre }, configurado`
    });
 
  
 
  });



} 


// Obtener Usuarios
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {
  
  cliente.on('obtener-usuarios', () => {

      // emito solo al cliente solicitante pueda ser que los demas clientes conectados ya tienen la lista y no les interesa .
     
      io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista()  );
      
  });

}



// io se usa paraque servidor emite a lso clientes como un message broker intermadiario entre clientes tambien



// nota : nosotros sabemos mediante socket podemos 
   /* 
    - mandar mesaje a un apersona en particular
    - a todo grupo 
    - todas personas que se encuentran en una sala en particular 
    - nosotros mandamos mensaje privado usando servicio rest 
   */
