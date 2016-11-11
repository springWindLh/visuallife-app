import {Component} from "@angular/core";
import {ArticleService} from "../../../shared/service/article.service";
import {Query} from "../../../shared/service/support/query";
import {Loading, LoadingController, NavController} from "ionic-angular";
import {ConfigUtil} from "../../../shared/config.util";
import {ArticleDetailPage} from "../detail/detail";
/**
 * Created by lh on 2016/11/11.
 */
@Component({
  selector:'article-user-list-page',
  templateUrl:'userList.html',
  providers:[ArticleService,LoadingController]
})
export class ArticleUserListPage{
  articles = [];
  query = new Query(0, 20);
  isLastPage = false;
  loading:Loading;

  constructor(private articleService: ArticleService, private nav: NavController,
              private load: LoadingController) {
    this.loading = load.create({
      content:'loading...'
    });
    this.loading.present();
    articleService.userList(this.query).subscribe(
      data => {
        this.loading.dismissAll();
        this.articles = data.content;
        this.isLastPage = data.last;
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  doInfinite(infiniteScroll) {
    setTimeout(()=> {
      if (!this.isLastPage) {
        this.query.page += 1;
        this.articleService.userList(this.query).subscribe(
          data => {
            this.articles = this.articles.concat(data.content);
            infiniteScroll.complete();
          },
          error=>alert(ConfigUtil.networkError)
        );
      }
    }, 1000);
  }

  toArticleDetailPage(id: number) {
    this.nav.push(ArticleDetailPage, {
      id: id
    });
  }
}
