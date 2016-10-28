import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {ToastUtil} from "../toast.util";
import {Query} from "./support/query";
/**
 * Created by lh on 2016/10/28.
 */
@Injectable()
export class ArticleService {

  constructor(private http: Http, private toast: ToastUtil) {
  }

  list(query: Query) {
    return this.http.get(ConfigUtil.apiUrl + '/article/list', {search: PageUtil.getPageParams(query)})
      .map((res)=>res.json().data);
  }
}
