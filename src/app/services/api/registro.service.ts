import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registro } from '../../objects/Registro';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  private registro = new BehaviorSubject<Array<Registro> | null>(null);
  private registrosEmpleado = new BehaviorSubject<Array<Registro> | null>(null);

  getAllRegistros(ID: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Registro>(environment.urlApi + 'api/registro/' + ID, { headers })
      .subscribe({
        next: (data) => {
          let meses: Array<Registro> = [];
          data['forEach']((element) => {
            let me: Registro = Registro.convertFrontObject(element);
            meses.push(me);
          });

          this.registro.next(meses);
        },
      });
  }
  getResultRegistros() {
    return this.registro;
  }

  getRegistroUnico(ID: any): Observable<Registro> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Registro>(environment.urlApi + 'api/registro/' + ID, {
      headers,
    });
  }

  getRegistrosEmpleado(ID: any) {
    this.registrosEmpleado = new BehaviorSubject<Array<Registro> | null>(null);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<any>(
        environment.urlApi +
          'api/registro/empleado?num_devoluciones=360&num_pagina=1&empleado=' +
          ID,
        { headers }
      )
      .subscribe((data) => {
        let registroArray: Array<Registro> = [];
        for (let i = 0; i < data.length; i++) {
          let registros: Registro = Registro.convertFrontObject(data[i]);
          registroArray.push(registros);
        }
        this.registrosEmpleado.next(registroArray);
      });
  }

  getRegistroEmpleadoResult() {
    return this.registrosEmpleado;
  }

  setRegistros(
    mes,
    entrada,
    salida,
    almuerzoEntrada,
    almuerzoSalida,
    comidaEntrada,
    comidaSalida,
    dia
  ) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post(
        environment.urlApi + 'api/registro',
        {
          mes: mes,
          entrada: entrada,
          salida: salida,
          almuerzoEntrada: almuerzoEntrada,
          almuerzoSalida: almuerzoSalida,
          comidaEntrada: comidaEntrada,
          comidaSalida: comidaSalida,
          dia: dia,
        },
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  editRegistro(
    id,
    entrada,
    salida,
    almuerzoEntrada,
    almuerzoSalida,
    comidaEntrada,
    comidaSalida,
    dia
  ) {
    entrada = entrada == '' ? null : entrada;
    salida = salida == '' ? null : salida;
    almuerzoEntrada = almuerzoEntrada == '' ? null : almuerzoEntrada;
    almuerzoSalida = almuerzoSalida == '' ? null : almuerzoSalida;
    comidaEntrada = comidaEntrada == '' ? null : comidaEntrada;
    comidaSalida = comidaSalida == '' ? null : comidaSalida;

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .put(
        environment.urlApi + `api/registro/${id}`,
        {
          entrada: entrada,
          salida: salida,
          almuerzoEntrada: almuerzoEntrada,
          almuerzoSalida: almuerzoSalida,
          comidaEntrada: comidaEntrada,
          comidaSalida: comidaSalida,
          dia: dia,
        },
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
