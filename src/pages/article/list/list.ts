import {Component} from "@angular/core";
import {ArticleService} from "../../../shared/service/article.service";
import {Query} from "../../../shared/service/support/query";
import {NavController} from "ionic-angular";
import {ArticleDetailPage} from "../detail/detail";
import {ConfigUtil} from "../../../shared/config.util";
/**
 * Created by lh on 2016/10/28.
 */
@Component({
  selector: 'article-list-page',
  templateUrl: 'list.html',
  providers: [ArticleService]
})
export class ArticleListPage {
  articles = [];
  query = new Query(0, 20);
  isLastPage = false;

  constructor(private articleService: ArticleService, private nav: NavController) {
    articleService.list(this.query).subscribe(
      data => {
        this.articles = data.content;
        this.isLastPage = data.last;
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  doInfinite(infiniteScroll) {
    if (!this.isLastPage) {
      this.query.page += 1;
      this.articleService.list(this.query).subscribe(
        data => {
          this.articles = this.articles.concat(data.content);
          infiniteScroll.complete();
        },
        error=>alert(ConfigUtil.networkError)
      );
    }
  }

  toArticleDetailPage(id: number) {
    this.nav.push(ArticleDetailPage, {
      id: id
    });
  }

}
