/**
 * Created by lh on 2016/11/1.
 */
export class Reply {
  private commentId: number;
  private accepterId: number;
  private content: string;

  constructor(commentId: number, accepterId: number, content: string) {
    this.commentId = commentId;
    this.accepterId = accepterId;
    this.content = content;
  }

}
