/**
 * Created by lh on 2016/11/1.
 */
export class Comment {
  static ARTICLE = 'ARTICLE';
  static STORY = 'STORY';
  targetType: string;
  targetId: number;
  content: string;

  constructor(targetType: string, targetId: number, content: string) {
    this.targetType = targetType;
    this.targetId = targetId;
    this.content = content;
  }

}
