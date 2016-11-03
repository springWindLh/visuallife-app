import {Http} from "@angular/http";
import {Query} from "./support/query";
import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Comment} from "../domain/comment";
import {Reply} from "../domain/reply";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
/**
 * Created by lh on 2016/11/1.
 */
@Injectable()
export class CommentService {
  constructor(private http: Http) {
  }

  list(query: Query, targetType: string, targetId: number):Observable<any> {
    let params = PageUtil.getPageParams(query);
    params.set('targetType', targetType);
    params.set('targetId', targetId.toString());
    return this.http.get(ConfigUtil.apiUrl + '/comment/list', {search: params})
      .map(res=>res.json().data);
  }

  addComment(comment: Comment):Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/comment/add', comment)
      .map(res=>res.json().data);
  }

  addReply(reply: Reply):Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/reply/add', reply)
      .map(res=>res.json().data);
  }

  voteComment(id: number):Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/comment/vote/' + id, {})
      .map(res=>res.json().data);
  }

  voteReply(id: number):Observable<any> {
    return this.http.post(ConfigUtil.apiUrl + '/reply/vote/' + id, {})
      .map(res=>res.json().data);
  }
}
