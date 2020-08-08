import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Guides } from '../guides'
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // guides: any;
  allGuides: any = [];
  public selectedFile;
  public show: boolean = false
  public term: string = ""
  arrSearched: Array<{ name: string }>

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.fetchData()
  }
  readonly allGuidesUrl = "http://localhost:8000/guides"
  fetchData() {
    this.http.get(this.allGuidesUrl)
      .subscribe((datas) => {
        this.allGuides = datas
      })
  }

  fileHandler(e) {
    this.selectedFile = e.target.files[0];
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
      this.ngOnInit()
    })
  }

  // updateAguide(name) {
  //   this.show = !this.show
  //   this.http.put(this.allGuidesUrl + "/" + name, {}).subscribe((data) => {
  //     console.log(data)
  //   })
  // }

  // onSearch() {
  //   this.http.get(this.allGuidesUrl).subscribe((searched: any) => {
  //     this.arrSearched = searched
  //   })
  // }

  changeGuides() {
    this.http.post("http://localhost:8000/searchGuides", { name: this.term }).subscribe((data) => {
      this.allGuides = data
    })
  }
}
