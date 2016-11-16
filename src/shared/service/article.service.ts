import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Query} from "./support/query";
import "rxjs/Rx";
import {Observable} from "rxjs";
/**
 * Created by lh on 2016/10/28.
 */
@Injectable()
export class ArticleService {
  NETWORK_ERROR = '网络异常';

  constructor(private http: Http) {
  }

  list(query: Query): Observable<any> {
    return this.http.get(ConfigUtil.apiUrl + '/article/list', {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);
  }

  detail(id: number): Observable<any> {
    return this.http.get(ConfigUtil.apiUrl + '/article/' + id)
      .map(res=>res.json().data);
  }

  vote(id: number): Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/article/vote/' + id, {})
      .map(res=>res.json().data);
  }

  userList(query: Query): Observable<any> {
    return this.http.get(ConfigUtil.apiUrl + '/article/user/list/' + ConfigUtil.user.id, {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);
  }

  remove(ids:Array<number>): Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/article/remove', ids)
      .map(res=>res.json().data);
  }
}
