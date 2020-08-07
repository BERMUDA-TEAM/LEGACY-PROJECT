import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Guides } from '../guides'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  posts: Guides;
  guides: any;
  allGuides: any = [];
  // file: any = {};

  constructor(private http: HttpClient) {
    this.posts = {
      name: "",
      description: "",
      age: 33,
      gender: "",
      languages: "",
      city: "",
      email: ""
    }
  }

  ngOnInit(): void {
    this.guides = this.http.get(this.allGuidesUrl)
      .subscribe((datas) => {
        this.allGuides = datas
      })
  }

  readonly allGuidesUrl = "http://localhost:8000/guides"

  // changeHandler(event) {
  //   let file = event.target.files[0]
  //   console.log("change handler file ", file)
  // }



  deleteAguide(name) {
    this.http.delete(this.allGuidesUrl + "/" + name).subscribe(() => {
      this.ngOnInit()
    })
  }

  name = ""
  description = ""
  age = 0
  gender = ""
  languages = ""
  city = ""
  email = ""

  onSubmit() {
    // const formData = new FormData()
    // formData.append('file', this.file)
    // console.log("formdata", formData)

    // this.http.post("http://localhost:8000/file", formData).subscribe(datas => {
    //   console.log("data from server", datas)
    // })

    this.posts.name = this.name
    this.posts.description = this.description
    this.posts.age = this.age
    this.posts.gender = this.gender
    this.posts.languages = this.languages
    this.posts.city = this.city
    this.posts.email = this.email

    this.http.post(this.allGuidesUrl + "/" + name, this.posts).subscribe(() => {
      this.ngOnInit()
    })
  }


  // updateAguide(name, description) {
  //   this.http.put(this.allGuidesUrl + "/" + name, {}).subscribe((data) => {
  //     console.log(data)
  //   })
  // }

}
