import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ArticleListPage} from "../pages/article/list/list";
import {ArticleDetailPage} from "../pages/article/detail/detail";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,HomePage,ArticleListPage,ArticleDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,HomePage,ArticleListPage,ArticleDetailPage
  ],
  providers: []
})
export class AppModule {}
