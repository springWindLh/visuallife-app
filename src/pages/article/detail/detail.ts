import {NavParams} from "ionic-angular";
import {ArticleService} from "../../../shared/service/article.service";
import {Component} from "@angular/core";
import {ConfigUtil} from "../../../shared/config.util";
import {CommentPage} from "../../comment/comment";
/**
 * Created by lh on 2016/10/30.
 */
@Component({
  selector:'article-detail-page',
  templateUrl:'detail.html',
  providers:[ArticleService],
  directives:[CommentPage]
})

export class ArticleDetailPage {
  article: any;

  constructor(private params: NavParams, private articleService: ArticleService) {
    this.article = this.articleService.detail(params.get('id')).subscribe(
      data=>this.article = data,
      error=>alert(ConfigUtil.networkError)
    );
  }


}
