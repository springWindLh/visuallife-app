import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
/**
 * Created by lh on 2016/10/28.
 */
@Injectable()
export class ToastUtil{
  constructor(private toast:ToastController){

  }

   show(msg:string){
     this.toast.create({
       message: msg,
       duration: 1500,
       position: 'middle'
     }).present();
  }
}
