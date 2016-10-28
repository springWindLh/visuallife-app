/**
 * Created by lh on 2016/10/28.
 */
export class Query{
  private _page: number = 0;
  private _size: number = 10;

  constructor(page: number, size: number) {
    this._page = page;
    this._size = size;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }
}
