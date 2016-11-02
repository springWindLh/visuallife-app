import {CommentService} from "../../shared/service/comment.service";
import {Component, Input} from "@angular/core";
import {Query} from "../../shared/service/support/query";
import {ConfigUtil} from "../../shared/config.util";
import {Comment} from "../../shared/domain/comment";
import {Reply} from "../../shared/domain/reply";
/**
 * Created by lh on 2016/11/1.
 */
@Component({
  selector: 'comment-page',
  templateUrl: 'comment.html',
  providers: [CommentService]
})
export class CommentPage {
  @Input() targetType: string;
  @Input() targetId: number;
  comment: Comment;
  reply: Reply;
  comments = [];
  query = new Query(0, 20);
  isLastPage = false;

  constructor(private commentService: CommentService) {

  }

  ngOnInit() {
    console.log(this.targetType);
    console.log(this.targetId);
    this.comment = new Comment(this.targetType, this.targetId, '');
    this.commentService.list(this.query, this.targetType, this.targetId).subscribe(
      data=> {
        this.comments = data.content;
        console.log(data);
        this.isLastPage = data.last;
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  doInfinite(infiniteScroll) {
    if (!this.isLastPage) {
      this.query.page += 1;
      this.commentService.list(this.query, this.targetType, this.targetId).subscribe(
        data => {
          this.comments = this.comments.concat(data.content);
          infiniteScroll.complete();
        },
        error=>alert(ConfigUtil.networkError)
      );
    }
  }

  saveComment() {
    this.commentService.addComment(this.comment).subscribe(
      data=>this.comments.push(data),
      error=>alert(ConfigUtil.networkError)
    )
  }

  saveReply(commentId: number, accepterId: number, content: string, replies: any[]) {
    this.reply = new Reply(commentId, accepterId, content);
    this.commentService.addReply(this.reply).subscribe(
      data=>replies.push(data),
      error=>alert(ConfigUtil.networkError)
    );
  }
}
