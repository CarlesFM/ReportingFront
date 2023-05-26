import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { Empleado } from 'src/app/objects/Empleado';
import { UnsubscribesDestroy } from 'src/app/objects/unsubscribesDestroy';
import { environment } from 'src/environments/environment';
import { EmpresaService } from './empresa.service';
import { Empresa } from 'src/app/objects/Empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService  extends UnsubscribesDestroy {
  constructor(private http: HttpClient, private router: Router,private empresaSE:EmpresaService) {
    super();
  }

  private empleados = new BehaviorSubject<Array<Empleado> | null>(null);

  createEmpleado(dni,empresa,rol) {

    this.getEmpleadoAll();
    this.getEmpleadosResult().pipe(takeUntil(this._unsubInd2)).subscribe(data=>{
      if(data==null){
        return;
      }
      let existeDNI:boolean=false;
      let msn:boolean=false;
      for (let i = 0; i < data.length; i++) {
          if(data[i].dni==dni){
            existeDNI=true;
            msn=true;
          }
      }
      if(!existeDNI){
        this.http
        .post(environment.urlApi + 'employee', {
          dni: dni,
          empresas: empresa,
          roles: [rol],
          password: ""
        })
        .subscribe((data) => {
          console.log(data);
        });
      }else if(msn){
        alert("El DNI introducido ya esta registrado")
      }
    })
  }

  registrarEmpleado(nombre, apellidos, correo, pwd, dni){
    this.getEmpleadoAll();
    this.getEmpleadosResult().pipe(takeUntil(this._unsubInd3))
    .subscribe((data) => {
      let id:any="";
      if (data == null) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if(data[i].dni == dni){
          if(data[i].apellidos==null && data[i].correo==null && data[i].nombre==null){
            id = data[i].id
          }
        }
      }
      if(id!=""){
        console.log(data)
      this.http.put(environment.urlApi+'api/empleado/'+id,{
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        password: pwd}).subscribe((data)=>{
          this.router.navigate(['']);
        },error=>{
          this.router.navigate(['']);
        });
      }else{
        alert("El DNI indicado no esta registrado en la base de datos")
      }
      this._unsubInd3.next(' ');
    })
  }

  getEmpleadoMes(username: any, token: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(environment.urlApi + 'api/empleado/' + username, { headers })
      .subscribe((response: any) => {
        let id = response.id;
        console.log(response.roles[0])
        if(response.roles[0]=="ROLE_ADMIN"){        
          this.router.navigate(['reporting/' + id]);
        }else{
          this.router.navigate(['horas/'+ id]);
        }
      });
  }

  getEmpleadoUnico(ID: any): Observable<Empleado> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Empleado>(environment.urlApi + 'api/empleado/' + ID, {
      headers,
    });
  }

  getEmpleadoAll() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Empleado>(
        environment.urlApi + 'api/empleado?num_devoluciones=150&num_pagina=1',
        { headers }
      )
      .subscribe((data) => {
        let empleado: Array<Empleado> = [];
        data['forEach']((element) => {
          let emp: Empleado = Empleado.convertFrontObject(element);
          empleado.push(emp);
        });
        this.empleados.next(empleado);
      });
  }

  getEmpleadosResult() {
    return this.empleados;
  }

  recuperarPwd(correo) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post(
        environment.urlApi + 'recuperar/password',
        { correo: correo },
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  editEmpleadoEmpresa(ID: any, empresa: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .put(
        environment.urlApi + 'api/empleado/' + ID,
        { empresas: empresa },
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
