import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmpleadoService } from './empleado.service';
import jwt_decode from 'jwt-decode';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private empleadoSE: EmpleadoService
  ) {}

  login(body: any) {
    this.http
      .post(environment.urlApi + 'login/user', {
        username: body.username,
        password: body.password,
      })
      .subscribe((response: any) => {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.token);
        } else {
          localStorage.setItem('token', response.token);
        }
        let tokenCod: any = localStorage.getItem('token');
        let tokenDe: any = jwt_decode(tokenCod);
        let username = tokenDe.username;
        this.empleadoSE.getEmpleadoMes(username, tokenCod);
      },error=>{
        alert("Correo o contraseña incorrecto, intentalo de nuevo o recupera la contraseña")
      });
  }
}
