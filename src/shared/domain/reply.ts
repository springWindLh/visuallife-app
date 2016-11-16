
import {ConfigUtil} from "../config.util";
import {User} from "./user";
/**
 * Created by lh on 2016/11/1.
 */
export class Reply {
   commentId: number;
   accepterId: number;
   content: string;
   user:User;

  constructor(commentId: number, accepterId: number, content: string) {
    this.commentId = commentId;
    this.accepterId = accepterId;
    this.content = content;
    this.user = ConfigUtil.user;
  }

}
