import {UserService} from "../../../shared/service/user.service";
import {ConfigUtil} from "../../../shared/config.util";
import {Component} from "@angular/core";
import {User} from "../../../shared/domain/user";
import {ToastUtil} from "../../../shared/toast.util";
import {Http} from "@angular/http";
/**
 * Created by lh on 2016/11/15.
 */
@Component({
  selector: 'user-info-page',
  templateUrl: 'info.html',
  providers: [UserService]
})
export class UserInfoPage {
  user: User = ConfigUtil.user;

  constructor(private userService: UserService, private toast: ToastUtil, private http: Http) {

  }

  updateInfo() {
    this.userService.update(this.user).subscribe(
      data=> {
        ConfigUtil.user = data.data;
        localStorage.setItem('nameOrMobile', this.user.name);
        this.toast.show(data.msg);
      },
      error=>alert(ConfigUtil.networkError)
    );
  }

  changeAvatar() {
    // const fileTransfer = new Transfer();
    // var options: any;
    // options = {
    //   fileKey: 'file',
    //   fileName: 'file',
    //   header: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };
    // ImagePicker.getPictures({
    //   maximumImagesCount: 1
    // }).then((results)=> {
    //   let filePath = results[0];
    //   console.log(filePath);
    //   fileTransfer.upload(filePath, ConfigUtil.apiUrl + '/qiniu/upload/avatar', options)
    //     .then((data)=> {
    //       var dataObj: any = Json.parse(data.response)
    //       console.log(dataObj.data);
    //       this.user.avatar = dataObj.data;
    //     });
    // });

  }

  // uploadAvatar($event) {
  //   let headers = new Headers();
  //   headers.set('Content-Type', 'multipart/form-data');
  //   let formData = new FormData();
  //   formData.append("name", "file");
  //   formData.append("file", $event.target.files[0]);
  //   this.http.post(ConfigUtil.apiUrl + '/qiniu/upload/avatar', formData, {
  //     headers: headers
  //   }).subscribe(data=> {
  //       let result = data.json();
  //       if (result.code) {
  //         console.log(result.data);
  //         this.user.avatar = result.data;
  //       } else {
  //         this.toast.show(result.msg);
  //       }
  //     },
  //     error=>alert(ConfigUtil.networkError)
  //   );
  //
  // }
}
