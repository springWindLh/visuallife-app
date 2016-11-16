/**
 * Created by lh on 2016/11/11.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../domain/user";
import {ConfigUtil} from "../config.util";
import {Http, URLSearchParams} from "@angular/http";
@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  update(user: User): Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/user/update', user)
      .map(res=>res.json());
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    let params = new URLSearchParams();
    params.append('oldPassword', oldPassword);
    params.append('newPassword', newPassword);
    return this.http.get(ConfigUtil.apiUrl + '/user/update/password/' + ConfigUtil.user.id, {search: params})
      .map(res=>res.json());
  }
}
