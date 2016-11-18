/**
 * Created by lh on 2016/11/17.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {NavController} from "ionic-angular";
import {ConfigUtil} from "../../shared/config.util";
import {ToastUtil} from "../../shared/toast.util";
import {MyApp} from "../../app/app.component";
import {User} from "../../shared/domain/user";
import {LoginPage} from "../login/login";
@Component({
  templateUrl: 'register.html',
  providers: [ToastUtil]
})

export class RegisterPage {
  user: User = new User();
  confirmPassword: string = '';

  constructor(private nav: NavController, private http: Http, private toast: ToastUtil) {

  }

  register() {
    this.http.post(ConfigUtil.apiUrl + '/register', this.user).subscribe((res)=> {
      let result = res.json();
      if (result.code) {
        ConfigUtil.user = result.data;
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('nameOrMobile', this.user.name);
        localStorage.setItem('password', this.user.password);
        this.nav.setRoot(MyApp);
      } else {
        this.toast.show(result.msg);
      }
    });
  }

  toLoginPage(){
    this.nav.setRoot(LoginPage);
  }
}
