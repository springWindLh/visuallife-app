import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Query} from "./support/query";
import {Observable} from "rxjs";
/**
 * Created by lh on 2016/10/31.
 */
@Injectable()
export class StoryService {
  NETWORK_ERROR = '网络异常';

  constructor(private http: Http) {
  }

  list(query: Query):Observable<any> {
    return this.http.get(ConfigUtil.apiUrl + '/story/list', {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);
  }

  detail(id: number):Observable<any> {
    return this.http.get(ConfigUtil.apiUrl + '/story/' + id)
      .map(res=>res.json().data);
  }

  vote(id:number):Observable<any>{
    return this.http.post(ConfigUtil.apiUrl + '/story/vote/'+id,{})
      .map(res=>res.json().data);
  }

  userList(query: Query): Observable<any> {
    return this.http.get(ConfigUtil.apiUrl + '/story/user/list/' + ConfigUtil.user.id, {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);
  }
}
