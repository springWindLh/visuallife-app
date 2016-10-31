import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Query} from "./support/query";
import 'rxjs/Rx';
/**
 * Created by lh on 2016/10/28.
 */
@Injectable()
export class ArticleService {
  NETWORK_ERROR = '网络异常';

  constructor(private http: Http) {
  }

  list(query: Query){
    return this.http.get(ConfigUtil.apiUrl + '/article/list', {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);
  }

  detail(id:number){
    return this.http.get(ConfigUtil.apiUrl + '/article/'+id)
      .map(res=>res.json().data);
  }
}
