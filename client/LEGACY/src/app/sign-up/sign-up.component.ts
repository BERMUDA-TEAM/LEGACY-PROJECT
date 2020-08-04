import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      addressMail: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSignUp() {
    const userName = this.signUpForm.get('Username').value;
    const addressMail = this.signUpForm.get('Adress-Mail').value;
    const firstName = this.signUpForm.get('First-Name').value;
    const lastName = this.signUpForm.get('Last-Name').value;
    const password = this.signUpForm.get('Password').value;
    this.auth
      .signUp(userName, addressMail, firstName, lastName, password)
      .then(() => {
        console.log('navigate');
        this.router.navigate(['/login'])
      })
      .catch(() => {
        console.log('error');
      });
  }
}
