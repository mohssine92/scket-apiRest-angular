import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';


  constructor( public wsService: WebsocketService,
               private router: Router,
               /* public chatService: ChatService */  // para ejecuccion de obtener clientes conectados pero no es necesario en esta altura
              ) { }

  ngOnInit(): void {
    
  }

  ingresar(){

    this.wsService.loginWS(this.nombre) // se implementa promise porque comunicar con el servidor toma tiempo - asi redericcionamos despues de resolver la tarea
       .then( () => { // resolve true

         this.router.navigateByUrl('/mensajes');

       });


  }

}


