/**
 * Created by lh on 2016/10/25.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {NavController, ToastController} from "ionic-angular";
import {Config} from "../../shared/config";
import {HomePage} from "../home/home";
@Component({
  templateUrl: 'login.html'
})

export class LoginPage {
  nameOrMobile: string;
  password: string;

  constructor(private nav: NavController, private http: Http, private toast: ToastController) {
  }

  login() {
    this.http.post(Config.apiUrl + '/login', {nameOrMobile: this.nameOrMobile, password: this.password}).subscribe((res)=> {
      let result = res.json();
      if (result.code) {
        this.nav.push(HomePage);
      }else {
        this.toast.create({
          message: result.msg,
          duration: 1500,
          position: 'middle'
        }).present();
      }
    });

  }
}
