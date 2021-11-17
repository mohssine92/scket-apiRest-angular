import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login-guard.services';
import { UsuarioGuard } from './guards/usuario-guard.services';


// pages componenets
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { GraficaComponent } from './pages/grafica/grafica.component';
import { GraficaTwoComponent } from './pages/grafica-two/grafica-two.component';

const routes: Routes = [
  { path: '', component: LoginComponent,
    canActivate: [ LoginGuard ]
  
  },
  { path: 'grafica-two', component: GraficaTwoComponent,
   //canActivate: [ LoginGuard ]
    
  },
  { path: 'grafica', component: GraficaComponent,
   //canActivate: [ LoginGuard ]
    
  },
  {
    path: 'mensajes',
    component: MensajesComponent,
    canActivate: [ UsuarioGuard ] // espera boolean para permitir acceso
  },
  { path: '**', component: LoginComponent } // cualquier otro path me lleva a ...


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/// --flat no crearlo dentro de una carpeta
