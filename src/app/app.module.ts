import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaHorasComponent } from './tabla-horas/tabla-horas.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';
import { RecuperacionPwdComponent } from './recuperacion-pwd/recuperacion-pwd.component';
import { UsuarioHorasComponent } from './usuario-horas/usuario-horas.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reporting/:id', component: TablaHorasComponent },
  { path: 'horas/:id', component: UsuarioHorasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperacionPwdComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TablaHorasComponent,
    NavBarComponent,
    LoginComponent,
    RegistroComponent,
    RecuperacionPwdComponent,
    UsuarioHorasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
