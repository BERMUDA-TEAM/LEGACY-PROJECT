import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private http: HttpClient) {}
  allGuides: any = [];
  //reviewType = false;
  //inputReview: string;
  // selectCity: string = '';
  // selectGender: string = '';

  guideIn = false;
  ngOnInit(): void {}
  // reviewIn() {
  //   this.reviewType = !this.reviewType;
  // }
  getUsers() {
    return this.http.get('http://localhost:8000/guides').subscribe((datas) => {
      this.allGuides = datas;
    });
  }

  // addReview() {
  //   console.log(this.inputReview);
  //   //
  // }
  //  getSelected(){
  //    return this.http.get(`http://localhost:8000/one${}&${}`).subscribe((datas)=>{
  //      this.allGuides=datas
  //    })
  //  }
  //  onChangeCity(){
  //     this.selectCity =
  //  }
  //  onChangeGender(){

  //  }
}
