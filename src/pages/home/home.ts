import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ArticleListPage} from "../article/list/list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private nav: NavController) {

  }

  toArticleListPage(){
    this.nav.push(ArticleListPage);
  }
}
