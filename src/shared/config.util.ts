/**
 * Created by lh on 2016/11/9.
 */
import {User} from "./domain/user";
import {Headers, RequestOptions} from "@angular/http";
export class ConfigUtil {
  static token = "";
  static apiUrl = "http://139.129.4.71:8080/visuallife-api/api";
  static networkError = "网络异常";
  static user: User;
  static randomColors:Array<string> = ['#bd8c7d', '#d1bfa7', '#3a4660', '#c9af98', '#839973', '#ed8a63', '#845007', '#21A8A3'];

  static getJsonOption() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: headers});
    return requestOptions;
  }

  static getRandomBottomStyle():string {
    let index = parseInt((Math.random() * 8).toString());
    return '0px -5px 0px ' + this.randomColors[index] + ' inset';
  }
}
