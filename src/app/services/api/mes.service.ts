import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Mes } from '../../objects/Mes';

@Injectable({
  providedIn: 'root',
})
export class MesService {
  value: any;
  constructor(private http: HttpClient) {}

  private fechaActual: Date = new Date();
  private mes = new BehaviorSubject<Array<Mes> | null>(null);
  private mesError = new BehaviorSubject<any | null>(null);

  setMes(ID: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let fechaActual: Date = new Date();
    this.http
      .post(
        environment.urlApi + 'api/mes',
        { fecha: fechaActual, empleado: ID },
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  setMesFecha(fecha: String, ID: number | null) {
    console.log('mes creado');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post(
        environment.urlApi + 'api/mes',
        { fecha: fecha, empleado: ID },
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  getAllMes(ID: number | null) {
    // this.mes = new BehaviorSubject<Array<Mes> | null>(null);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Mes>(environment.urlApi + 'api/mes/empleado/' + ID, { headers })
      .subscribe((data) => {
        // console.log(data)
        let meses: Array<Mes> = [];
        data['forEach']((element) => {
          let me: Mes = Mes.convertFrontObject(element);
          meses.push(me);
        });
        this.mes.next(meses);
      });
  }
  getErrorMes() {
    return this.mesError;
  }

  getResultMes() {
    return this.mes;
  }

  getMesUnico(ID: number | null, fecha: string): Observable<Mes> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Mes>(
      environment.urlApi +
        `api/mes?num_devoluciones=10&num_pagina=1&fecha=${fecha}&empleado=${ID}`,
      { headers }
    );
  }
}
