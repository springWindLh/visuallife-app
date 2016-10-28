import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";


@Component({
  template: `
<ion-nav *ngIf="rememberMe == 'true'" [root]="rootPage"></ion-nav>
<ion-nav *ngIf="rememberMe != 'true'" [root]="rootPage" swipeBackEnabled="false"></ion-nav>
`
})
export class MyApp {
  rememberMe = localStorage.getItem('rememberMe');
  rootPage: any;

  constructor(platform: Platform) {
    console.log(this.rememberMe);
    if (this.rememberMe == 'true') {
      this.rootPage = HomePage;
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
