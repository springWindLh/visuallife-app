import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
/**
 * Created by lh on 2016/11/1.
 */
@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value):SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
