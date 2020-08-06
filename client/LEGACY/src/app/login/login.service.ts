import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router : Router) {}

  LogIn(addressMail: string, password: string) {
    const url: string = 'http://localhost:8000/LogIn';
    return new Promise((resolve, reject) => {
      this.http
        .post(url, {
          addressMail: addressMail,
          password: password,
        })
        .subscribe(
          (res) => {
            let token = res['token'];
            localStorage.setItem('token', token);
            // this.router.navigate([""])
            console.log(res['token']);
            resolve();
          },
          (error) => {
            console.log('reject');
            reject(error);
          }
        );
    });
  }
}
