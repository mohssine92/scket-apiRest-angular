import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(  public wsService: WebsocketService ) { }

  ngOnInit(): void {
  }

  salir() {
    this.wsService.logoutWS();
    // TODO: cierre de session - si trabajamos con jwt perfecto funciona igual solo agregar la funcionalidades en esta accion como procesos , 
    // enla realidad yo en ningun momento termino la comunicacion socket pero lo que hago es limpiar storage y limpio nombre ... refrencia modelo en caso db y actualizo lista de users conectados 
    // la comunicacion socket se pierde y termina al cerrar la instancia navigador en este caso - recuerda la instancia de socket se crea en punto alto de la app en appcomponnete .
  }

}



// la idea cuando entro a este componente tengo un usuario socket y me socket service sepa que user es .
// y cuando mi socket server sepa que usuarios tiene conectados - podemos crear un servicio rest que nos diga los usuarios connectados mediante socket
