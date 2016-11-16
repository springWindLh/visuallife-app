import {CommentService} from "../../shared/service/comment.service";
import {Component} from "@angular/core";
import {Query} from "../../shared/service/support/query";
import {ConfigUtil} from "../../shared/config.util";
import {Comment} from "../../shared/domain/comment";
import {Reply} from "../../shared/domain/reply";
import {NavParams, ViewController, AlertController} from "ionic-angular";
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

  constructor(private commentService: CommentService, private params: NavParams,
              private view: ViewController, private alertCtrl: AlertController) {
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

  dismiss() {
    this.view.dismiss();
  }

  voteComment(comment) {
    if(!this.verifyCommentVote(comment.id)){
      this.commentService.voteComment(comment.id).subscribe(
        data=>{
          comment.vote = data.vote;
          localStorage.setItem('comment_' + ConfigUtil.user.id + '_' + comment.id, 'true');
        },
        error=>alert(ConfigUtil.networkError)
      );
    }
  }

  voteReply(reply) {
    if(!this.verifyReplyVote(reply.id)){
      this.commentService.voteReply(reply.id).subscribe(
        data=>{
          reply.vote = data.vote;
          localStorage.setItem('reply_' + ConfigUtil.user.id + '_' + reply.id, 'true');
        },
        error=>alert(ConfigUtil.networkError)
      );
    }
  }

  verifyCommentVote(commentId) {
    return localStorage.getItem('comment_' + ConfigUtil.user.id + '_' + commentId) == 'true';
  }

  verifyReplyVote(replyId) {
    return localStorage.getItem('reply_' + ConfigUtil.user.id + '_' + replyId) == 'true';
  }

  showReplyAlert(comment) {
    let replyAlert = this.alertCtrl.create({
      title: '@' + comment.user.name,
      inputs: [
        {
          name: 'content'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data=> {
          }
        },
        {
          text: '回复',
          handler: data=> {
            if(data.content!=''){
              let reply = new Reply(comment.id, comment.user.id, data.content);
              this.commentService.addReply(reply).subscribe(
                data=>comment.replies.push(data),
                error=>alert(ConfigUtil.networkError)
              );
            }
          }
        }
      ]
    });
    replyAlert.present();
  }

}
