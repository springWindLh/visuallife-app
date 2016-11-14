import {Component} from "@angular/core";
import {ArticleService} from "../../../shared/service/article.service";
import {Query} from "../../../shared/service/support/query";
import {NavController, Loading, LoadingController} from "ionic-angular";
import {ArticleDetailPage} from "../detail/detail";
import {ConfigUtil} from "../../../shared/config.util";
/**
 * Created by lh on 2016/10/28.
 */
@Component({
  selector: 'article-list-page',
  templateUrl: 'list.html',
  providers: [ArticleService,LoadingController]
})
export class ArticleListPage {
  articles = [];
  query = new Query(0, 20);
  isLastPage = false;
  loading:Loading;

  constructor(private articleService: ArticleService, private nav: NavController,
              private load: LoadingController) {

    this.loading = this.load.create({
      content:'loading...'
    });
    this.loading.present();
    this.initData();
  }

  initData(){
    this.articleService.list(this.query).subscribe(
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
        this.articleService.list(this.query).subscribe(
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

  doRefresh(refresher) {
    setTimeout(()=> {
      this.query.page = 0;
      this.initData();
      refresher.complete();
    }, 1000);
  }
}
