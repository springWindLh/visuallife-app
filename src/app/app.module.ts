import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ArticleListPage} from "../pages/article/list/list";
import {ArticleDetailPage} from "../pages/article/detail/detail";
import {StoryListPage} from "../pages/story/list/list";
import {StoryDetailPage} from "../pages/story/detail/detail";
import {SafeHtmlPipe} from "../shared/pipe/safehtml.pipe";

@NgModule({
  declarations: [
    MyApp,
    SafeHtmlPipe,
    LoginPage,HomePage,ArticleListPage,ArticleDetailPage,
    StoryListPage,StoryDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,HomePage,ArticleListPage,ArticleDetailPage,
    StoryListPage,StoryDetailPage
  ],
  providers: []
})
export class AppModule {}
