import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userName: string;
  addressMail: string;
  firstName: string;
  lastName: string;
  password: string;
  input1 = 'hello';
  constructor(private http: HttpClient) {}

  postData() {
    const url: string = 'http://localhost:8000/signUp';
    this.http
      .post(url, {
        userName: this.userName,
        addressMail: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      })
      .toPromise()
      .then((data: string) => {
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
