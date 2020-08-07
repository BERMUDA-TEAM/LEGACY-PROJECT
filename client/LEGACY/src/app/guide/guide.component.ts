import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {
  constructor(private http: HttpClient) {}
  reviewType = false;
  sendType = true;
  inputReview: string = '';
  allReviews: any;

  @Input() guide: any;
  ngOnInit(): void {}
  reviewIn() {
    this.reviewType = !this.reviewType;
  }
  addReview() {
    this.sendType = !this.sendType;
    console.log(this.sendType);
    this.http
      .post('http://localhost:8000/reviews', { review: this.inputReview })
      .subscribe((data) => {
        console.log('response', data);
      });
  }
}
