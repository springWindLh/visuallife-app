import {ToastController} from "ionic-angular";
/**
 * Created by lh on 2016/10/28.
 */
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
