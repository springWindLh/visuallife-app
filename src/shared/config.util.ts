/**
 * Created by lh on 2016/11/9.
 */
import {User} from "./domain/user";
import {Headers, RequestOptions} from "@angular/http";
export class ConfigUtil {
  static token = "";
  static apiUrl = "http://192.168.1.13:8083/api";
  static networkError="网络异常";
  static user:User;

  static getJsonOption() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: headers});
    return requestOptions;
  }

}
