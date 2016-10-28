import {Component} from "@angular/core";
import {ArticleService} from "../../shared/service/article.service";
import {Query} from "../../shared/service/support/query";
/**
 * Created by lh on 2016/10/28.
 */
@Component({
  selector: 'article-list-page',
  templateUrl: 'list.html'
})
export class ArticleList {
  articles = [];
  query = new Query(0, 10);

  constructor(private articleService: ArticleService) {
    this.articles = articleService.list(this.query);
  }

  doInfinite(infiniteScroll) {
    setTimeout(()=> {
      this.query.page += 1;
      this.articles.push(this.articleService.list(this.query));
    }, 500);
  }

}
