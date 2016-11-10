import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by lh on 2016/11/2.
 */
@Pipe({name: 'dateTime'})
export class DateTimePipe implements PipeTransform {
  constructor() {
  }

  transform(value) {
    let time = new Date(value);
    return time.toLocaleDateString();
  }
}
