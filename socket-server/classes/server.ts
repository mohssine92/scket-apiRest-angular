import express from 'express'; // npm install --save-dev @types/expresspara ayuda de tipado : recuerda estamos trabajando en ts - para todos paquetes
import { SERVER_PORT } from '../global/environment';
import router from '../routes/router';
import cors from 'cors';
import socketIO from 'socket.io'; // socketIO : lo escribimos como queremaos  
import http from 'http';

// importacion de todas funciones de un archivo y darle nombre variable de acceso 
import * as socket from '../sockets/socket'; 



// export default por que unico que exporto desde este archivo , sea paquete que se exporta por defect cuando alguien importe esta clase
export default class Server {

    private static _intance: Server; // prop del mismo tipo de la class porque en ella almacenamos objeto instancia de la misma classe

    public app: express.Application;
    public port: number;

    public io: socketIO.Server; // io es muy similar al servidor de express , es la config de conexion de los sockets - prop encargada de emitir y escuchar eventos 
    private httpServer: http.Server;


    // si el constructor es private no se puede instanciar la clase por new etc .. (implemenatcion de patron singflton : 23)  ; 
    private constructor() {

      this.app = express();
      this.port = SERVER_PORT;

      // lo que hacemos vamos a a levantar servidor atraves modul http server - asi le pasamos configuracion de express
      this.httpServer = new http.Server( this.app );

      // socket.io necesita recibir configuracion del servidor que esta corriendo en este instante .
      // en teoria seria this.app es el servidor pero como socket y express no son compatibles directamente usamos intermediaro es http modul 
      // lo que hace express levantar servidor de protocolo http es lo que hace express y http son totalmente compatibles
       this.io = new socketIO.Server( this.httpServer, { cors: {origin: true, credentials:true} } ); 
      //this.io= require('socket.io')(this.httpServer, { cors: {origin: true, credentials: true  }, });

    
      this.middlewares();
      this.routes();
      this.escucharSockets(); 

    }
     
    /* algo static le puedo hacer referencia desde fuera atraves la class sin instanciar la clase
       esto lo que es patron singlton : aseguara que haya una instancia no dos , evitar intanciar dos veces servidor de sockets - tener dos o tres por eso hemos puesto 
       constructor en private lo que hace no se puede instaciar la clase desde fuera , requiera una prop statica para hacer la tare esto es todo  */
    public static get instance() {
     // return this._intance || ( this._intance = new this() );// esta prop static returna instacia de la class si no existe - si existe return la misma sin instanciar dos veces o 3 etc.. 
      if( this._intance ){
        return this._intance;
      }else{
          return this._intance = new this();
      }
    }

    middlewares() {

     // probable si si hace peticion para consumir servicios de otro dominio diferente el de back la peticion sera bloqueada - habilitar cors - configurar luego limitar dominios permitidos 
     // { origin: true, credentials: true  } : esta config permite cualquier persona podra llamar mis servicios - ver doc oficial para mas informacion 
     //this.app.use( cors({ origin: true, credentials: true  }) ); 
     
     // parsear en json estandar puente  de inetercambio de data 
     this.app.use( express.json() );

    }

    routes(){
      this.app.use('/', router );

    } 

    private escucharSockets(){

      console.log('Escuchando conexiones - sockets');

      this.io.on('connection', cliente => { // es una nueva computador que se conecta a nuestra conexion socket 

         
          // any client connected to this server api - socket 
          console.log('id cliente : ',cliente.id)

          // conectar cliente socket 
          socket.conectarCliente( cliente , this.io );


          // configurar usuario
          socket.configurarUusuario( cliente , this.io );


          // Obtener usuarios activos
          socket.obtenerUsuarios( cliente, this.io );

          // Mensajes
          socket.mensaje( cliente , this.io );

          // Desconectar
          socket.desconectar(cliente, this.io)
          
         

      });






    }

    // es privado es decir solo se va a llamar desde la inicializacion de la class

    start( callback: any ) { // !!!
     // this.app.listen( this.port, callback ); // aqui se llama la funccion de callbak para su ejecucion  (express no esta compatibele ... ver arriba)
     this.httpServer.listen( this.port, callback ); 
    }

}

