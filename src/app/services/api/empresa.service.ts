import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/objects/Empresa';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  private empresa = new BehaviorSubject<Array<Empresa> | null>(null);

  getAllEmpresas() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(
        environment.urlApi + 'api/empresas?num_devoluciones=150&num_pagina=1',
        { headers }
      )
      .subscribe((data) => {
        let empresas: Array<Empresa> = [];
        data['forEach']((element) => {
          let em: Empresa = Empresa.convertFrontObject(element);
          empresas.push(em);
        });
        this.empresa.next(empresas);
      });
  }
  getEmpresasResult() {
    return this.empresa;
  }
}
