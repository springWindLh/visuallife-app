import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {ConfigUtil} from "../../../shared/config.util";
import {StoryService} from "../../../shared/service/story.service";
/**
 * Created by lh on 2016/10/30.
 */
@Component({
  selector:'story-detail-page',
  templateUrl:'detail.html',
  providers:[StoryService]
})

export class StoryDetailPage {
  story: any;
  storyId:number;

  constructor(private params: NavParams, private storyService: StoryService) {
    this.storyId = params.get('id');
    this.story = this.storyService.detail(this.storyId).subscribe(
      data=>this.story = data,
      error=>alert(ConfigUtil.networkError)
    );
  }


}
