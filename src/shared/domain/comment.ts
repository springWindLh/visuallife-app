/**
 * Created by lh on 2016/11/1.
 */
export class Comment {
  static ARTICLE = 'ARTICLE';
  static STORY = 'STORY';
  private _targetType: string;
  private _targetId: number;
  private _content: string;

  constructor() {
  }

  constructor(targetType: string, targetId: number, content: string) {
    this._targetType = targetType;
    this._targetId = targetId;
    this._content = content;
  }


  get targetType(): string {
    return this._targetType;
  }

  set targetType(value: string) {
    this._targetType = value;
  }

  get targetId(): number {
    return this._targetId;
  }

  set targetId(value: number) {
    this._targetId = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
