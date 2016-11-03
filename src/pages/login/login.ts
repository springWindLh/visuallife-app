/**
 * Created by lh on 2016/10/25.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {NavController} from "ionic-angular";
import {ConfigUtil} from "../../shared/config.util";
import {HomePage} from "../home/home";
import {ToastUtil} from "../../shared/toast.util";
@Component({
  templateUrl: 'login.html',
  providers: [ToastUtil]
})

export class LoginPage {
  nameOrMobile: string = '';
  password: string = '';

  constructor(private nav: NavController, private http: Http, private toast: ToastUtil) {

  }

  login() {
    this.http.post(ConfigUtil.apiUrl + '/login', {
      nameOrMobile: this.nameOrMobile,
      password: this.password
    }).subscribe((res)=> {
      let result = res.json();
      if (result.code) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('nameOrMobile', this.nameOrMobile);
        localStorage.setItem('password', this.password);
        ConfigUtil.user = result.data;
        this.nav.push(HomePage);
      } else {
        this.toast.show(result.msg);
      }
    });

  }
}
