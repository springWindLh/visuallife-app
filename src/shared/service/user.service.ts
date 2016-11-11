/**
 * Created by lh on 2016/11/11.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../domain/user";
import {ConfigUtil} from "../config.util";
import {Http} from "@angular/http";
@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  update(user: User): Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/user/update', user)
      .map(res=>res.json().data);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/user/update/password/' + ConfigUtil.user.id, {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .map(res=>res.json().data);
  }
}
