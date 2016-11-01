/**
 * Created by lh on 2016/11/1.
 */
export class Reply {
  private _commentId: number;
  private _accepterId: number;
  private _content: string;

  constructor(commentId: number, accepterId: number, content: string) {
    this._commentId = commentId;
    this._accepterId = accepterId;
    this._content = content;
  }


  get commentId(): number {
    return this._commentId;
  }

  set commentId(value: number) {
    this._commentId = value;
  }

  get accepterId(): number {
    return this._accepterId;
  }

  set accepterId(value: number) {
    this._accepterId = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
