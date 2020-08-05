import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }

  LogIn(addressMail: string, password: string) {
    const url: string = 'http://localhost:8000/LogIn';
    return new Promise((resolve, reject) => {
      this.http
        .post(url, {
          addressMail: addressMail,
          password: password,
        })
        .subscribe(
          () => {
            console.log('resolved');
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
