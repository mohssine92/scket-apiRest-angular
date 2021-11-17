import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// para hacer peticiones es serviciosRest 
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; // !!
const config: SocketIoConfig = { // !!
  url: environment.wsUrl , options: {}
};







import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { FormsModule } from '@angular/forms';
import { GraficaComponent } from './pages/grafica/grafica.component';
import { GraficaTwoComponent } from './pages/grafica-two/grafica-two.component';








// TODO: Modulo alto de la app

@NgModule({
  declarations: [
    // componenete princiapl 
    AppComponent,

    ChatComponent,
    LoginComponent,
    MensajesComponent,
    FooterComponent,
    ListaUsuariosComponent,
    GraficaComponent,
    GraficaTwoComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // sockets
    SocketIoModule.forRoot(config),
    // graficas dependecy
    ChartsModule,
    // request to ServicioRest 
    HttpClientModule,



    FormsModule,
    // conectar los sockets
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
