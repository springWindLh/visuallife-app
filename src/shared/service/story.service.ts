import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Query} from "./support/query";
/**
 * Created by lh on 2016/10/31.
 */
@Injectable()
export class StoryService {
  NETWORK_ERROR = '网络异常';

  constructor(private http: Http) {
  }

  list(query: Query) {
    return this.http.get(ConfigUtil.apiUrl + '/story/list', {search: PageUtil.getPageParams(query)})
      .map(res=>res.json().data);
  }

  detail(id: number) {
    return this.http.get(ConfigUtil.apiUrl + '/story/' + id)
      .map(res=>res.json().data);
  }
}
