import {URLSearchParams} from "@angular/http";
import {Query} from "./service/support/query";
/**
 * Created by lh on 2016/10/28.
 */
export class PageUtil {
  static getPageParams(query: Query) {
    let params = new URLSearchParams();
    params.append('page', query.page.toString());
    params.append('size', query.size.toString());
    return params;
  }

  static getPageParams(query: Query, map: Map) {
    let params = new URLSearchParams();
    params.append('page', query.page.toString());
    params.append('size', query.size.toString());
    map.forEach(function (value, key) {
      params.append(key, value);
    });
    return params;
  }
}
