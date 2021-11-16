import {  Component, OnInit } from '@angular/core';

import { Observable  } from 'rxjs';


import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit  {


 usuariosActivosObs!: Observable<any>;


  constructor(  public chatService: ChatService  ) {
  
  }

  ngOnInit (): void {
    //  escenario que ha psado server emite la lista antes de la construccion de este componente de inicilizacion de esta observable . 
    // asi volvemos a solicitar abajo nueva emision en consecuencia despues del build de esta observable 
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Emitir el obtenerUsuarios -  resgresa un evento por parte servidor le interesa a esta Observable this.usuariosActivosObs
    this.chatService.emitirUsuariosActivos();

    // TODO: sustitucion podemos llmar un servicioRest traer lista por primera vez y luego psamos a iniciral la observable . tambien resuelve el problema 





  }






}
