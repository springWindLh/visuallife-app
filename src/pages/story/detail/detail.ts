import {NavParams, ModalController} from "ionic-angular";
import {Component} from "@angular/core";
import {ConfigUtil} from "../../../shared/config.util";
import {StoryService} from "../../../shared/service/story.service";
import {CommentService} from "../../../shared/service/comment.service";
import {CommentPage} from "../../comment/comment";
/**
 * Created by lh on 2016/10/30.
 */
@Component({
  selector: 'story-detail-page',
  templateUrl: 'detail.html',
  providers: [StoryService, CommentService]
})

export class StoryDetailPage {
  story: any;
  storyId: number;
  commentAmount: number;
  targetType = 'STORY';

  constructor(private params: NavParams, private storyService: StoryService, private commentService: CommentService,
              private modal: ModalController) {
    this.storyId = params.get('id');
    this.initData();
  }

  initData() {
    this.story = this.storyService.detail(this.storyId).subscribe(
      data=>this.story = data,
      error=>alert(ConfigUtil.networkError)
    );

    this.commentService.countComment(this.targetType, this.storyId).subscribe(
      data=>this.commentAmount = data,
      error=>alert(ConfigUtil.networkError)
    );
  }

  presentModal() {
    let modal = this.modal.create(CommentPage, {
      targetType: this.targetType,
      targetId: this.storyId
    });
    modal.present();
  }

  voteStory(story) {
    if (!this.verifyStoryVote(story.id)) {
      this.storyService.vote(story.id).subscribe(
        data=> {
          this.story.vote = data.vote;
          localStorage.setItem('story_' + ConfigUtil.user.id + '_' + story.id, 'true')
        },
        error=>alert(ConfigUtil.networkError)
      );
    }
  }

  verifyStoryVote(articleId) {
    return localStorage.getItem('story_' + ConfigUtil.user.id + '_' + articleId);
  }

}
