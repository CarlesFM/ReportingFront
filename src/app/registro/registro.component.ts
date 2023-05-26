import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../services/api/empleado.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(private empleadoSE: EmpleadoService, private router: Router) {}

  nombre: string = '';
  apellidos: string = '';
  correo: string = '';
  pwd: string = '';
  dni: string = '';

  nombreValido: string = 'true';
  apellidosValido: string = 'true';
  correoValido: string = 'true';
  pwdValido: string = 'true';
  dniValido: string = 'true';

  correoExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  nombreExp = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+([ '-][A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*$/;
  apellidosExp = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+([ '-][A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*$/;
  dniExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
  pwdExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  validar() {
    if (!this.correoExp.test(this.correo)) {
      this.correoValido = 'false';
    } else {
      this.correoValido = 'true';
    }

    if (!this.nombreExp.test(this.nombre)) {
      this.nombreValido = 'false';
    } else {
      this.nombreValido = 'true';
    }

    if (!this.apellidosExp.test(this.apellidos)) {
      this.apellidosValido = 'false';
    } else {
      this.apellidosValido = 'true';
    }
  }

  validarDNI() {
    if (!this.dniExp.test(this.dni)) {
      this.dniValido = 'false';
    } else {
      let letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE';
      let numDNI = this.dni.slice(0, 8);
      let letraDNI = this.dni.slice(8);
      let resto = parseInt(numDNI) % 23;
      let letraCalculada = letrasDNI.charAt(resto);

      if (letraDNI.toUpperCase() == letraCalculada) {
        this.dniValido = 'true';
      } else {
        this.dniValido = 'false';
      }
    }
  }

  registrar(nombre, apellidos, correo, pwd, dni) {
    if (!this.pwdExp.test(this.pwd)) {
      this.pwdValido = 'false';
      alert(
        'La contraseña tiene que tener los siguientes requisitos:\n-Al menenos una letra minuscula\n-Al menos una letra mayuscula\n-Al menos un numero\n-Al menos un caracter especial (! @ _ - $ % ...)\n-Longitud minima de 8 caracteres'
      );
    } else {
      this.pwd = 'true';
      this.empleadoSE.registrarEmpleado(nombre, apellidos, correo, pwd, dni);
    }
  }

  ngOnInit(): void {}
}
