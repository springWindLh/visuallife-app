import {CommentService} from "../../shared/service/comment.service";
import {Component} from "@angular/core";
import {Query} from "../../shared/service/support/query";
import {ConfigUtil} from "../../shared/config.util";
import {Comment} from "../../shared/domain/comment";
import {Reply} from "../../shared/domain/reply";
import {NavParams, ViewController} from "ionic-angular";
/**
 * Created by lh on 2016/11/1.
 */
@Component({
  selector: 'comment-page',
  templateUrl: 'comment.html',
  providers: [CommentService]
})
export class CommentPage {
  targetType: string;
  targetId: number;
  comment: Comment;
  reply: Reply;
  comments = [];
  query = new Query(0, 20);
  isLastPage = false;

  constructor(private commentService: CommentService,private params:NavParams,
  private view:ViewController) {
    this.targetType = params.get('targetType');
    this.targetId = params.get('targetId');
    this.comment = new Comment(this.targetType, this.targetId, '');
    this.commentService.list(this.query, this.targetType, this.targetId).subscribe(
      data=> {
        this.comments = data.content;
        this.isLastPage = data.last;
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  doCommentInfinite(infiniteScroll) {
    setTimeout(()=> {
      if (!this.isLastPage) {
        this.query.page += 1;
        this.commentService.list(this.query, this.targetType, this.targetId).subscribe(
          data=> {
            this.comments = this.comments.concat(data.content);
            this.isLastPage = data.last;
          },
          error=>alert(ConfigUtil.networkError)
        );
      }
      infiniteScroll.complete();
    }, 1000);
  }

  saveComment() {
    this.commentService.addComment(this.comment).subscribe(
      data=> {
        this.comments.push(data);
        this.comment.content = '';
      },
      error=>alert(ConfigUtil.networkError)
    )
  }

  saveReply(commentId: number, accepterId: number, content: string, replies: any[]) {
    this.reply = new Reply(commentId, accepterId, content);
    this.commentService.addReply(this.reply).subscribe(
      data=> {
        replies.push(data);
        this.reply.content = '';
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  dismiss(){
    this.view.dismiss();
  }
}
