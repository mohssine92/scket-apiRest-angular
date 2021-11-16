import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';


// TODO: una nota importante - servicios siempre son clases centralizadas pero yo puedo elegir nivel en el arbol de los componentes donde los quiero ejecutar dependiendo de la nececisidad
// este componente es el nivel mas alto - este componente siempre se enecuentra ejecutando - es la puerta principal de la app .



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  // WebsocketService : despues de injectar el servicio se entra en ejecuccion su constructor y sus injecciones :  es decir a esta altura se detecta el servidor que un cliente se conecta
  // este es un punto muy alto de la app para ejecutar servicios con data  requerida en proceso inmediatamente , como guards etc ..  
  constructor( public wsService: WebsocketService,
               // puedoe jecutarlo en cualquier altua segun necesidadad dentro de la app 
               public chatServie: ChatService 


  ) {

  }

  // es componenete es punto de inicio de la app es lugar perfecto para escuchar mensajes privados
  // tambien se puede colocar en cualquier lugar centralizado segun necesidad . 
  // aqui escucho mensajes  enviados por apiRest - es similar de notificar una sala de clientes , igual que lo de notifcaciones de firbase
  ngOnInit() {
     console.log('Nivel alto de la app');
    // TODO:  podemos crear una interfaz para leer los mensajes privados 
    this.chatServie.getMessagesPrivate()
      .subscribe( msg => {
        console.log('private mesage');
        console.log(msg); // aqui tengo mensaje privado : enviado por servicio rest socket server => mostrar en algun modal o pantalla

      });

  }










}
