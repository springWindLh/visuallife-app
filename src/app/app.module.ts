import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ArticleListPage} from "../pages/article/list/list";
import {ArticleDetailPage} from "../pages/article/detail/detail";
import {StoryListPage} from "../pages/story/list/list";
import {StoryDetailPage} from "../pages/story/detail/detail";
import {SafeHtmlPipe} from "../shared/pipe/safeHtml.pipe";
import {CommentPage} from "../pages/comment/comment";
import {ShortTimePipe} from "../shared/pipe/shortTime.pipe";
import {DateTimePipe} from "../shared/pipe/datetime.pipe";
import {ArticleUserListPage} from "../pages/article/userList/userList";
import {SideMenu} from "../pages/menu/menu";
import {StoryUserListPage} from "../pages/story/userList/userList";
import {UserInfoPage} from "../pages/user/info/info";
import {UserPasswordPage} from "../pages/user/password/password";
import {RegisterPage} from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    SafeHtmlPipe,ShortTimePipe,DateTimePipe,
    LoginPage,HomePage,ArticleListPage,ArticleDetailPage,
    StoryListPage,StoryDetailPage,CommentPage,ArticleUserListPage,
    SideMenu,StoryUserListPage,UserInfoPage,UserPasswordPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,HomePage,ArticleListPage,ArticleDetailPage,
    StoryListPage,StoryDetailPage,CommentPage,ArticleUserListPage,
    SideMenu,StoryUserListPage,UserInfoPage,UserPasswordPage,
    RegisterPage
  ],
  providers: []
})
export class AppModule {}
