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
  // posts: Guides;
  guides: any;
  allGuides: any = [];
  // file: any = {};
  public selectedFile;
  constructor(private http: HttpClient) {
    // this.posts = {
    //   name: "",
    //   description: "",
    //   age: 33,
    //   gender: "",
    //   languages: "",
    //   city: "",
    //   email: ""
    // }
  }

  ngOnInit(): void {
    this.guides = this.http.get(this.allGuidesUrl)
      .subscribe((datas) => {
        console.log(datas)
        this.allGuides = datas
      })
  }

  readonly allGuidesUrl = "http://localhost:8000/guides"

  fileHandler(e) {
    this.selectedFile = e.target.files[0];
    console.log(this.selectedFile)
  }

  deleteAguide(name) {
    this.http.delete(this.allGuidesUrl + "/?name=" + name).subscribe(() => {
      this.ngOnInit()
    })
  }
  name = ""
  description = ""
  age = ""
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
    const uploadData = new FormData();
    uploadData.append("imageFile", this.selectedFile);
    uploadData.append("name", this.name)
    uploadData.append("description", this.description)
    uploadData.append("age", this.age)
    uploadData.append("gender", this.gender)
    uploadData.append("languages", this.languages)
    uploadData.append("city", this.city)
    uploadData.append("email", this.email)

    this.http.post(this.allGuidesUrl + "/" + name, uploadData).subscribe((data) => {
      console.log(data)
      this.ngOnInit()
    })
  }


  // updateAguide(name, description) {
  //   this.http.put(this.allGuidesUrl + "/" + name, {}).subscribe((data) => {
  //     console.log(data)
  //   })
  // }

}
