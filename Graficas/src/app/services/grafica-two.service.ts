import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root' // importado en modulo princiapl por default 
})
export class GraficaTwoService {

  constructor(public wsService: WebsocketService) { 
    console.log('GraficaTwoService inicialized');
  
  }


  escucharCambiosGrafica () {
    return this.wsService.listen('cambio-grafica');
  }

  // grafica notificada cob data mediante socket realtiem - que esta data esta disparado por back mediante sercivoRest-post  :D 


}
