import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public wsService: WebsocketService,
    private router: Router
  ) { }


  canActivate() {

    //console.log( this.wsService.getUsuario()); undefined igual que null o false al momento de hacer la condicion
   
    console.log('guard access to login')

    if ( !this.wsService.getUsuario() ) {
      return true;
    } else {
      this.router.navigateByUrl('/mensajes');
      return false;
    }




  }











}



// restringir acceso a pages componentes .... depende de la logica
// simplement es un servico que implementa mas logica
