import {Component} from "@angular/core";
import {Query} from "../../../shared/service/support/query";
import {NavController, LoadingController, Loading} from "ionic-angular";
import {ConfigUtil} from "../../../shared/config.util";
import {StoryService} from "../../../shared/service/story.service";
import {StoryDetailPage} from "../detail/detail";
/**
 * Created by lh on 2016/10/28.
 */
@Component({
  selector: 'story-list-page',
  templateUrl: 'list.html',
  providers: [StoryService]
})
export class StoryListPage {
  stories = [];
  query = new Query(0, 20);
  isLastPage = false;
  loading: Loading;

  constructor(private storyService: StoryService, private nav: NavController,
              private load: LoadingController) {
    this.loading = this.load.create({
      content: 'loading...'
    });
    this.loading.present();
    this.initData();
  }

  initData() {
    this.storyService.list(this.query).subscribe(
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
        this.storyService.list(this.query).subscribe(
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

  doRefresh(refresher) {
    setTimeout(()=> {
      this.query.page = 0;
      this.initData();
      refresher.complete();
    }, 1000);
  }
}
