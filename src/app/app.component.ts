import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {Http} from "@angular/http";
import {ConfigUtil} from "../shared/config.util";
import {ToastUtil} from "../shared/toast.util";


@Component({
  template: `
<ion-nav *ngIf="rememberMe == 'true'" [root]="rootPage"></ion-nav>
<ion-nav *ngIf="rememberMe != 'true'" [root]="rootPage" swipeBackEnabled="false"></ion-nav>
`
})
export class MyApp {
  rememberMe = localStorage.getItem('rememberMe');
  nameOrMobile = localStorage.getItem('nameOrMobile');
  password = localStorage.getItem('password');
  rootPage: any;

  constructor(platform: Platform,http:Http,toast:ToastUtil) {
    if (this.rememberMe == 'true') {
      http.post(ConfigUtil.apiUrl + '/login', {
        nameOrMobile: this.nameOrMobile,
        password: this.password
      }).subscribe(
        res=>{
          let result = res.json();
          if(result.code){
            this.rootPage = HomePage;
          }else{
            toast.show(result.msg);
          }
        },
        error=>alert(ConfigUtil.networkError)
      );

    } else {
      this.rootPage = LoginPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
