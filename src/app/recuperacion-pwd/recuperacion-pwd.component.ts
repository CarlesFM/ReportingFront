import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/api/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion-pwd',
  templateUrl: './recuperacion-pwd.component.html',
  styleUrls: ['./recuperacion-pwd.component.css'],
})
export class RecuperacionPwdComponent implements OnInit {
  correo: string = '';

  constructor(private empleadoSE: EmpleadoService, private router: Router) {}

  recuperar(correo) {
    this.empleadoSE.recuperarPwd(correo);
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
