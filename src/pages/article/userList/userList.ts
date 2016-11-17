import {Component, ViewChildren} from "@angular/core";
import {ArticleService} from "../../../shared/service/article.service";
import {Query} from "../../../shared/service/support/query";
import {Loading, LoadingController, NavController, AlertController} from "ionic-angular";
import {ConfigUtil} from "../../../shared/config.util";
import {ArticleDetailPage} from "../detail/detail";
/**
 * Created by lh on 2016/11/11.
 */
@Component({
  selector: 'article-user-list-page',
  templateUrl: 'userList.html',
  providers: [ArticleService, LoadingController]
})
export class ArticleUserListPage {
  @ViewChildren('checkbox') checkboxes;
  articles = [];
  query = new Query(0, 20);
  isLastPage = false;
  loading: Loading;
  checkboxVisible = false;
  globalChecked = false;
  removeArticleIds = [];

  constructor(private articleService: ArticleService, private nav: NavController,
              private load: LoadingController,private alert:AlertController) {
    this.loading = this.load.create({
      content: 'loading...'
    });
    this.loading.present();
    this.initData();
  }

  initData() {
    this.articleService.userList(this.query).subscribe(
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

  editList() {
    this.checkboxVisible = !this.checkboxVisible;
  }

  removeArticles() {
    let confirm = this.alert.create({
      message:'确认删除已选中的条目？',
      buttons:[
        {
          text:'取消',
          handler:()=>{

          }
        },{
          text:'删除',
          handler:()=>{
            this.articleService.remove(this.removeArticleIds).subscribe(
              data=> {
                this.removeArticleIds.forEach(articleId=> {
                  let index = this.articles.findIndex(article=>article.id == articleId);
                  this.articles.splice(index, 1);
                });
                this.removeArticleIds = [];
                this.articleService.userList(this.query).subscribe(
                  data => {
                    this.articles = this.articles.concat(data.content);
                  },
                  error=>alert(ConfigUtil.networkError)
                );
              },
              error=>alert(ConfigUtil.networkError)
            );
          }
        }
      ]
    });
    confirm.present();
  }

  checkboxChange(id, index, box) {
    if (box.checked) {
      this.removeArticleIds.push(id);
    } else {
      this.removeArticleIds.splice(index, 1);
    }
  }

  checkAllBox() {
    this.globalChecked = !this.globalChecked;
    this.checkboxes._results.map(box=>box.checked = this.globalChecked);
  }

  doRefresh(refresher) {
    setTimeout(()=> {
      this.query.page = 0;
      this.initData();
      refresher.complete();
    }, 1000);
  }
}
