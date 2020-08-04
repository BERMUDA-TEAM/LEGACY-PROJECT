import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  UserName = '';
  AdressMail = '';
  FirstName = '';
  LastName = '';
  Password = '';

  onSignUp() {
    this.auth
      .signUp(
        this.UserName,
        this.AdressMail,
        this.FirstName,
        this.LastName,
        this.Password
      )
      .then(() => {
        console.log('navigate');
        this.router.navigate(['/login']);
      })
      .catch(() => {
        console.log('error');
      });
  }
}
