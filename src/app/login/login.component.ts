import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/api/Login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginSE: LoginService) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    let login = form.value;

    // console.log(login);

    this.loginSE.login(login);

    // this.router.navigate(['reporting'])
  }
  reporting() {
    this.router.navigate(['reporting']);
  }

  registro() {
    this.router.navigate(['registro']);
  }
  recuperarPwd() {
    this.router.navigate(['recuperar']);
  }
}
