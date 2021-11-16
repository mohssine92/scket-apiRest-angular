import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { environment } from 'src/environments/environment';

// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; // !!


import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';





const config: SocketIoConfig = { // !!
  url: environment.wsUrl , options: {}
};


// TODO: Modulo alto de la app

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MensajesComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)  // !!

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
