import {UserService} from "../../../shared/service/user.service";
import {ConfigUtil} from "../../../shared/config.util";
import {Component} from "@angular/core";
import {User} from "../../../shared/domain/user";
import {ToastUtil} from "../../../shared/toast.util";
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

  constructor(private userService: UserService,private toast:ToastUtil) {

  }

  updateInfo() {
    this.userService.update(this.user).subscribe(
      data=>{
        ConfigUtil.user = data.data;
        localStorage.setItem('nameOrMobile', this.user.name);
        this.toast.show(data.msg);
      },
      error=>alert(ConfigUtil.networkError)
    );
  }
}
