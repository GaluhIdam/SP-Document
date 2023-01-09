import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Imagepath: String;
  Logopath: String;
  
  constructor() {
    this.Imagepath = './assets/bg-spdoc.png'
    this.Logopath = './assets/gmf-logo.webp'
  }
  ngOnInit() {
  }
}