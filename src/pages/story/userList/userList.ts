import {Component, ViewChildren} from "@angular/core";
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
  @ViewChildren('checkbox') checkboxes;
  stories = [];
  query = new Query(0, 20);
  isLastPage = false;
  loading: Loading;
  checkboxVisible = false;
  globalChecked = false;
  removeStoryIds = [];

  constructor(private storyService: StoryService, private nav: NavController,
              private load: LoadingController) {
    this.loading = this.load.create({
      content: 'loading...'
    });
    this.loading.present();
    this.initData();
  }

  initData(){

    this.storyService.userList(this.query).subscribe(
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

  editList() {
    this.checkboxVisible = !this.checkboxVisible;
  }

  removeStories() {
    this.storyService.remove(this.removeStoryIds).subscribe(
      data=>{
        this.removeStoryIds.forEach(storyId=>{
          let index = this.stories.findIndex(story=>story.id==storyId);
          this.stories.splice(index, 1);
        });
        this.removeStoryIds = [];
        this.storyService.userList(this.query).subscribe(
          data => {
            this.stories = this.stories.concat(data.content);
          },
          error=>alert(ConfigUtil.networkError)
        );
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  checkboxChange(id,index,box) {
    if(box.checked) {
      this.removeStoryIds.push(id);
    }else{
      this.removeStoryIds.splice(index,1);
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
