import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  UserName: string = '';
  AdressMail: string = '';
  FirstName: string = '';
  LastName: string = '';
  Password: string = '';

  onSignUp() {
    this.auth
      .signUp(
        this.UserName,
        this.AdressMail,
        this.FirstName,
        this.LastName,
        this.Password
      )
      .then((re) => {
        console.log(re);
        this.router.navigateByUrl('/');
        console.log('navigate');
      })
      .catch(() => {
        console.log('error');
      });
  }
}
