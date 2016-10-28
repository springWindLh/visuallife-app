import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ArticleListPage} from "../pages/article/list";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,HomePage,ArticleListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,HomePage,ArticleListPage
  ],
  providers: []
})
export class AppModule {}
