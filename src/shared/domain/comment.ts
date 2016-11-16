import {User} from "./user";
import {ConfigUtil} from "../config.util";
/**
 * Created by lh on 2016/11/1.
 */
export class Comment {
  static ARTICLE = 'ARTICLE';
  static STORY = 'STORY';
  targetType: string;
  targetId: number;
  content: string;
  user:User;

  constructor(targetType: string, targetId: number, content: string) {
    this.targetType = targetType;
    this.targetId = targetId;
    this.content = content;
    this.user = ConfigUtil.user;
  }

}
