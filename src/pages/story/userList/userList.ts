import {Component} from "@angular/core";
import {Query} from "../../../shared/service/support/query";
import {Loading, LoadingController, NavController} from "ionic-angular";
import {ConfigUtil} from "../../../shared/config.util";
import {StoryService} from "../../../shared/service/story.service";
import {StoryDetailPage} from "../detail/detail";
/**
 * Created by lh on 2016/11/11.
 */
@Component({
  selector: 'story-user-list-page',
  templateUrl: 'userList.html',
  providers: [StoryService, LoadingController]
})
export class StoryUserListPage {
  stories = [];
  query = new Query(0, 20);
  isLastPage = false;
  loading: Loading;

  constructor(private storyService: StoryService, private nav: NavController,
              private load: LoadingController) {
    this.loading = load.create({
      content: 'loading...'
    });
    this.loading.present();
    storyService.userList(this.query).subscribe(
      data => {
        this.loading.dismissAll();
        this.stories = data.content;
        this.isLastPage = data.last;
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  doInfinite(infiniteScroll) {
    setTimeout(()=> {
      if (!this.isLastPage) {
        this.query.page += 1;
        this.storyService.userList(this.query).subscribe(
          data => {
            this.stories = this.stories.concat(data.content);
            infiniteScroll.complete();
          },
          error=>alert(ConfigUtil.networkError)
        );
      }
    }, 1000);
  }

  toStoryDetailPage(id: number) {
    this.nav.push(StoryDetailPage, {
      id: id
    });
  }
}
