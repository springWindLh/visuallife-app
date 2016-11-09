import {NavParams, ModalController} from "ionic-angular";
import {ArticleService} from "../../../shared/service/article.service";
import {Component, OnInit} from "@angular/core";
import {ConfigUtil} from "../../../shared/config.util";
import {CommentService} from "../../../shared/service/comment.service";
import {CommentPage} from "../../comment/comment";
/**
 * Created by lh on 2016/10/30.
 */
@Component({
  selector: 'article-detail-page',
  templateUrl: 'detail.html',
  providers: [ArticleService, CommentService]
})

export class ArticleDetailPage{
  article: any;
  articleId: number;
  commentAmount: number;
  targetType = 'ARTICLE';

  constructor(private params: NavParams, private articleService: ArticleService,
              private commentService: CommentService,private modal:ModalController) {
    this.articleId = params.get('id');
    this.articleService.detail(this.articleId).subscribe(
      data=>this.article = data,
      error=>alert(ConfigUtil.networkError)
    );

    this.commentService.countComment(this.targetType,this.articleId).subscribe(
      data=>this.commentAmount = data,
      error=>alert(ConfigUtil.networkError)
    );
  }

  presentModal(){
    let modal = this.modal.create(CommentPage,{
      targetType:this.targetType,
      targetId:this.articleId
    });
    modal.present();
  }
}
