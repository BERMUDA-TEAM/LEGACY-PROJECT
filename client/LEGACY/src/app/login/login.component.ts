import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  AdressMail: string = '';
  Password: string = '';

  onLogIn() {
    this.auth
      .LogIn(this.AdressMail, this.Password)
      .then(() => {
        this.toastr.success('Welcome', 'Connected');
        this.router.navigateByUrl('/user');
        console.log('navigate');
      })
      .catch((err) => {
        this.toastr.error('Incorrect Mail & Password', 'Error');
        console.log(err);
      });
  }
}
