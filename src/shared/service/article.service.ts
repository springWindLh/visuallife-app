import {Injectable, Provider} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Query} from "./support/query";
// import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Created by lh on 2016/10/28.
 */
@Injectable()
export class ArticleService {

  constructor(private http: Http) {
  }

  list(query: Query){
    return this.http.get(ConfigUtil.apiUrl + '/article/list', {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);//.catch(this.handleError);
  }
}
