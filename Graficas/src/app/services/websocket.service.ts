//import { ClassField } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Socket } from 'ngx-socket-io'; // servico !!

import { Usuario } from '../classes/usuario';





@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false; // servidor de socket caedo
  public usuario! : Usuario | null;




  // injeccion de modulo de socket
  constructor(
     //injecciones
     private socket: Socket,
     private router: Router
  ) { // cuando la clase sea instanciada por primera vez

    // refresh... , tambien usuario se purga y es usado por guards  para dejar acceder o mejor dicho mantener en mensajes pagina - cargarStorage lo redefiene 
    // no olvidar que este servicio debe ser ejecutar en nivel alto de la app , antes del proceso de guards : en appComponente de appModule es lugar perfecto para la injeccion 
    this.cargarStorage(); 
    // inicializacion de liteners socket
    this.checkStatus(); // porque .. este cosntrucotr se jecuta solo una vez y estas son observable


  }


  // saber cuando se conecta y cuandos se desconecta el servidor socket : saber sobre el estado del servidor
  checkStatus() {
    // observables estaran pendiente de connect y disconnect del servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      
   
      this.cargarStorage(); // se calle servidor y se vuelva a conectar nodemon o node en produccion  en caso de actualizacion de servicios o micro servicios
      //, se purga la informacion , por eso obtenemos infomacion del storage para reeautenticar rapidamenet sin que user dara cuenta
     
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }

  // metodo encargado de  emitir todos eventos que va a disparar mi app de angular hacia el servidor
  emit( evento: string, payload?: any, callback?: Function ) {

  

    console.log('Emitiendo', evento);
    // emit('EVENTO', payload, callback?)
    this.socket.emit( evento, payload, callback );

  }

  // escuchar lo que emite el servidor socket , regresa observable lo cual puedo subscribir y unsubscribir
  listen( evento: string ) { // event : evento quiero escuchar
    return this.socket.fromEvent( evento );
  }


  // recibo nombre  es opcional puede haber tenerlo almacenado en la prop usuario de forma global en esta classe
  // en este momento estamos enforcados en sockets comunication - para segurida manejamos con jwt - mandmos token y lo comprobamos del lado del servidor
  // lo que me interesa en este propceso que el socket server sepa quien es esta  conectado : es juan , fernando , Miguel
  loginWS( nombre: string ) {

    return new Promise(  (resolve, reject) => {
      // TODO: normalmente deberia mandar en payload pass y nombre para verificar autenticacion por parte del servidor nodejs
      this.emit( 'configurar-usuario', { nombre }, (resp: Function) => {


        this.usuario = new Usuario( nombre );
        this.guardarStorage();  // esta en memoria la instancia - refresh pierde la instancia

        console.log('callback :',resp);
        console.log(this.usuario);
        resolve(true);

        // cuando
        // cuandothis.guardarStorage();
        // cuando
        // cuandoresolve();

      });

    });

  }

  logoutWS() {
    // borro de memoria class
    this.usuario = null;
    localStorage.removeItem('usuario'); // porque el que me esta manteniendo la session es localstorage - 
    // y en la nav vamos a tener solo una session esta en variable usuario 

    const payload = {
      nombre: 'sin-nombre'
    }; // porque servidor usuario con nombre 'sin-nombre' lo considera cliente socket no autenticado segun validacion 

    // desconectar por parte de nodejs
    this.emit('configurar-usuario', payload, () => {} ); // no necesito el callback
    this.router.navigateByUrl('');// redireccionar

  }


  getUsuario() { // solicitado por canActivat
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );
  }

  cargarStorage() {

    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario')! );
      // Autenticacion contra back
      this.loginWS( this.usuario!.nombre ); // mandamos nombre al servidor pero ojo el id socket sera nuevo - ???
      // al momento de hacer refresh el servidor siempre mantiene nombre de usuario : podemos usar uuid de un db por ej
      // mientras no purgamos storage el socketserver mantiene el mismo nombre auque refresh reconexion al mismo y nuevo id socket
    }


  }




}


/*
  la idea este archivo seria reutulizable en cualquier proyecto queremos agragar comunicacion en tiempo real (copiar pegar ) para manejar notificacione etcc
  - solo faltaria la importacion y configuraciones en la parte del modulo y todo seria bien guay chebere
*/

/*
  recuerda que la idea de este websocketservice sea puramente con la comunicacion de sockets ,
*/


/*
  por ejemplo chat subscribirme escuchando  las emisiones , despues abandono el chat no me interesa saber nada del chat , entonces muevo a otra pagina
  ese observable debe destruirlo paraque ya no escuchemos estos eventos que  no nos importa
*/


// 41 mantener usuario apesar de reconexion al servidor por refresh cambio pantalla . caida del servidor
