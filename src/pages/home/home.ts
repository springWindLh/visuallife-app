import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ArticleListPage} from "../article/list/list";
import {StoryListPage} from "../story/list/list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private nav: NavController) {
  }

  toArticleListPage() {
    this.nav.push(ArticleListPage);
  }

  toStoryListPage() {
    this.nav.push(StoryListPage);
  }

}
