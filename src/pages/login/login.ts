/**
 * Created by lh on 2016/10/25.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {NavController} from "ionic-angular";
import {Config} from "../../shared/config";
@Component({
    templateUrl: 'login.html'
})

export class LoginPage {
    name:string;
    password:string;

    constructor(private navCtrl:NavController, private http:Http) {
    }

    login() {
        this.http.post(Config.apiUrl + '/login',{nameOrMobile:this.name,password:this.password}).subscribe((res)=> {
            console.log(res.ok);
        });
        // this.navCtrl.push(HomePage);
    }
}
