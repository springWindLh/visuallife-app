/**
 * Created by lh on 2016/11/17.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {NavController, LoadingController, Loading} from "ionic-angular";
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
  loading: Loading;

  constructor(private nav: NavController, private http: Http, private toast: ToastUtil, private load: LoadingController) {

  }

  register() {
    this.loading = this.load.create({
      content: '注册中...'
    });
    this.loading.present();
    this.http.post(ConfigUtil.apiUrl + '/register', this.user).subscribe((res)=> {
      let result = res.json();
      if (result.code) {
        ConfigUtil.user = result.data;
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('nameOrMobile', this.user.name);
        localStorage.setItem('password', this.user.password);
        this.loading.dismissAll();
        this.nav.setRoot(MyApp);
      } else {
        this.toast.show(result.msg);
      }
    });
  }

  toLoginPage() {
    this.nav.setRoot(LoginPage);
  }
}
