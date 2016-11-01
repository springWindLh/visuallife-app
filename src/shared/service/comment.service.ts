import {Http} from "@angular/http";
import {Query} from "./support/query";
import {ConfigUtil} from "../config.util";
import {PageUtil} from "../page.util";
import {Comment} from "../domain/comment";
import {Reply} from "../domain/reply";
/**
 * Created by lh on 2016/11/1.
 */
export class CommentService {
  constructor(private http: Http) {
  }

  list(query: Query, targetType: string, targetId: number) {
    let params = PageUtil.getPageParams(query);
    return this.http.get(ConfigUtil.apiUrl + '/comment/list', {search: params})
      .map(res=>res.json().data);
  }

  addComment(comment: Comment) {
    return this.http.post(ConfigUtil.apiUrl + '/comment/add', comment)
      .map(res=>res.json().data);
  }

  addReply(reply: Reply) {
    return this.http.post(ConfigUtil.apiUrl + '/reply/add', reply)
      .map(res=>res.json().data);
  }

  voteComment(id: number) {
    return this.http.post(ConfigUtil.apiUrl + '/comment/vote/' + id, {})
      .map(res=>res.json().data);
  }

  voteReply(id: number) {
    return this.http.post(ConfigUtil.apiUrl + '/reply/vote/' + id, {})
      .map(res=>res.json().data);
  }
}
