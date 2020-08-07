import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: LoginService, private router: Router) {}

  ngOnInit(): void {}

  AdressMail: string = '';
  Password: string = '';

  onLogIn() {
    this.auth
      .LogIn(this.AdressMail, this.Password)
      .then(() => {
        this.router.navigateByUrl('/user');
        console.log('navigate');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
