import {Headers, RequestOptions} from "@angular/http";
export class ConfigUtil {
  static apiUrl = "http://localhost:8083/api";
  static token = "";
  static networkError="网络异常";

  static getJsonOption() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: headers});
    return requestOptions;
  }

}
