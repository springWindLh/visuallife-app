/**
 * Created by lh on 2016/11/15.
 */
import {UserService} from "../../../shared/service/user.service";
import {ConfigUtil} from "../../../shared/config.util";
import {ToastUtil} from "../../../shared/toast.util";
import {Component} from "@angular/core";
@Component({
  selector: 'user-password-page',
  templateUrl: 'password.html',
  providers: [UserService]
})
export class UserPasswordPage {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private toast: ToastUtil) {
  }

  updatePassword() {
    this.userService.updatePassword(this.oldPassword, this.newPassword).subscribe(
      data=> {
        if (data.code) {
          ConfigUtil.user.password = this.newPassword;
          localStorage.setItem('password', this.newPassword);
          this.toast.show(data.msg);
        } else {
          this.toast.show(data.msg);
        }
      },
      error=>alert(ConfigUtil.networkError)
    );
  }
}
