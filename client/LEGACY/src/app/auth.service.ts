import { Injectable, createPlatform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(
    userName: string,
    addressMail: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const url: string = 'http://localhost:8000/signUp';
    return new Promise((resolve, reject) => {
      this.http
        .post(url, {
          userName: userName,
          addressMail: addressMail,
          firstName: firstName,
          lastName: lastName,
          password: password,
        })
        .subscribe(() => {
          console.log('resolved');
          resolve()
        },
        (error) => {
          console.log('reject')
          reject(error)
        });
    });
  }
}
