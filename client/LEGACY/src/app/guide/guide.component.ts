import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {
  constructor(private http: HttpClient) {
    this.getReviews();
  }
  reviewType = false;
  sendType = true;
  inputReview: string = '';
  allReviews: any;
  SentReviews:any=[]
  //x=this.allReviews[(this.allReviews.length)-1].review

  @Input() guide: any;
  ngOnInit(): void {
    this.getReviews();
    this.sentReviews()
  }

  reviewIn() {
    this.reviewType = !this.reviewType;
  }
  addReview() {
    this.sendType = !this.sendType;
    console.log(this.sendType);
    this.http
      .post('http://localhost:8000/reviews', { review: this.inputReview })
      .subscribe((data) => {
        this.ngOnInit();
      });
  }
  getReviews() {
    this.http.get('http://localhost:8000/reviews').subscribe((datas) => {
      console.log(datas);
      this.allReviews = datas;
    });
  }

  sentReviews(){
    if (this.allReviews.length>=5){
      for( var i = this.allReviews.length-1 ; i >this.allReviews.length-5 ; i -- ){
        this.SentReviews.push(this.allReviews[i].review)
      }
    }
    else {
      for( var i = this.allReviews.length-1 ; i >0 ; i -- ){
        this.SentReviews.push(this.allReviews[i].review)
      }
    }
  }
}
