/**
 * Created by lh on 2016/11/11.
 */
import {Component, ViewChild} from "@angular/core";
import {ArticleUserListPage} from "../article/userList/userList";
import {HomePage} from "../home/home";
import {ConfigUtil} from "../../shared/config.util";
import {MenuController} from "ionic-angular";
import {StoryUserListPage} from "../story/userList/userList";
@Component({
  selector: 'side-menu',
  templateUrl: 'menu.html'
})

export class SideMenu {
  @ViewChild('myContent') menuNav;
  user = ConfigUtil.user;
  rootPage = HomePage;

  constructor(private menu:MenuController){
  }
  gotoPage(pageName: string) {
    switch (pageName) {
      case 'articleUserListPage':
        this.menuNav.push(ArticleUserListPage);
        this.menu.close();
        break;
      case 'storyUserListPage':
        this.menuNav.push(StoryUserListPage);
        this.menu.close();
        break;
      default:break;
    }
  }
}
