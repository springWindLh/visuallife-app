import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by lh on 2016/11/2.
 */
@Pipe({name: 'shortTime'})
export class ShortTimePipe implements PipeTransform {
  constructor() {
  }

  transform(value) {
    let time = new Date(value);
    let milliSenconds = new Date().getTime();
    let spacing = (milliSenconds - value) / 1000;//获取时间差（秒）
    let minute = 60;
    let hour = 60 * minute;
    let day = 24 * hour;
    if (spacing >= 0 && spacing < 60) {
      return '刚刚';
    } else if (spacing >= minute && spacing < hour) {
      return Math.floor(spacing / minute) + '分钟前';
    } else if (spacing >= hour && spacing < day) {
      return Math.floor(spacing / hour) + '小时前';
    } else if (spacing >= day && spacing < 7 * day) {
      return Math.floor(spacing / day) + '天前';
    } else {
      return time.toLocaleDateString();
    }
  }
}
