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
}
