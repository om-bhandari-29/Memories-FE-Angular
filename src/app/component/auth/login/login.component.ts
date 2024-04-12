import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData, LoginModel } from '../../../model/login.model';
import { ComponentBase } from '../../../shared/class/ComponentBase.class';
import { ResponseGeneric } from '../../../response/responseG.response';
import { APIRoutes } from '../../../shared/constant/APIRoutes.constant';
import { IUser } from '../../../response/user.model';
import { environment } from '../../../environment/environment';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends ComponentBase {

  constructor(private _utilService: UtilService){
    super();
  }

  public loginForm: FormGroup<LoginModel> = new FormGroup<LoginModel>({
    email: new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9_\-\.]+@[a-z]+\.[c][o][m]/)]),
    password: new FormControl(null, Validators.required)
  });


  public login(){
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      this.isShowBtnLoader = true;
      const loginUData: LoginData = this.loginForm.value as LoginData;
  
      this.headerOptions.isSilentCall = true;

      this.postMethodPromise<LoginData, ResponseGeneric<IUser>>(APIRoutes.login, loginUData, this.headerOptions).then(
        (res) =>{
          if(res.status){
            this._toastreService.success(res.message);
            this._utilService.loggedIdUserName = res.data.name;
            this._utilService.loggedInUser$.next(true);
            this._router.navigate(['/']);
            localStorage.setItem(environment.jwtTokenName, res.data.token);
          }
          else{
            this._toastreService.error(res.message);
          }
        }
      )
    }
  }

}
