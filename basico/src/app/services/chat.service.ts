import { Injectable } from '@angular/core';

import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  activeUsers:any; // uasado meintras solucion a nuestra problema

  constructor( public wsService: WebsocketService ) {
     this.getUsuariosActivos();
  }

  // emitir mensaje con un evento al servidor - servidor debe estar escucuchando el evento dentro dl scop del clienet conectado
  sendMessage( mensaje: string ) {

    const payload = {
      de: this.wsService.getUsuario()!.nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload );

  }

  getMessages() { // escuchar emisiones del servidor de un evento especifico
    return this.wsService.listen('mensaje-nuevo');
  }


  // API - socket : forma de destrubucion 
  getMessagesPrivate() {
    return this.wsService.listen( 'mensaje-privado' );
  }




  /* nb: NGonir del componente no no da resultado hasta que hacemos refresh asi asi vamos a escuchar misma observable dos veces para resolver inconviniente mientras */
  getUsuariosActivos () {

   return this.wsService.listen( 'usuarios-activos' );

  }

  emitirUsuariosActivos() {

   this.wsService.emit( 'obtener-usuarios');

  }



}
/* este objeto ChatService sera responsable lo que tenga que ver comunicacion entre usuarios   */
