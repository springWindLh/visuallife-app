/**
 * Created by lh on 2016/10/25.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {NavController, LoadingController, Loading} from "ionic-angular";
import {ConfigUtil} from "../../shared/config.util";
import {ToastUtil} from "../../shared/toast.util";
import {MyApp} from "../../app/app.component";
import {RegisterPage} from "../register/register";
@Component({
  templateUrl: 'login.html',
  providers: [ToastUtil]
})

export class LoginPage {
  nameOrMobile: string = '';
  password: string = '';
  loading: Loading;

  constructor(private nav: NavController, private http: Http, private toast: ToastUtil, private load: LoadingController) {

  }

  login() {
    this.loading = this.load.create({
      content: '登录中...'
    });
    this.loading.present();
    this.http.post(ConfigUtil.apiUrl + '/login', {
      nameOrMobile: this.nameOrMobile,
      password: this.password
    }).subscribe((res)=> {
      this.loading.dismissAll();
      let result = res.json();
      if (result.code) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('nameOrMobile', this.nameOrMobile);
        localStorage.setItem('password', this.password);
        ConfigUtil.user = result.data;
        this.nav.setRoot(MyApp);
      } else {
        this.toast.show(result.msg);
      }
    });
  }

  toRegisterPage() {
    this.nav.push(RegisterPage);
  }
}
