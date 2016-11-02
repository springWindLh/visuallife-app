import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by lh on 2016/11/2.
 */
@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor() {}
  transform(value) {

  }
}
