import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterData, RegisterModel } from '../../../model/register.model';
import { ComponentBase } from '../../../shared/class/ComponentBase.class';
import { APIRoutes } from '../../../shared/constant/APIRoutes.constant';
import { environment } from '../../../environment/environment';
import { ResponseGeneric } from '../../../response/responseG.response';
import { IUser } from '../../../response/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends ComponentBase {

  public registerForm: FormGroup<RegisterModel> = new FormGroup<RegisterModel>({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/[a-zA-Z0-9_\-\.]+@[a-z]+\.[c][o][m]/)]),
    password: new FormControl(null, Validators.required)
  });

  public register(){
    this.registerForm.markAllAsTouched();

    if(this.registerForm.valid){
      this.isShowBtnLoader = true;
      const registerUData: RegisterData = this.registerForm.value as RegisterData;
  
      this.headerOptions.isSilentCall = true;

      this.postMethodPromise<RegisterData, ResponseGeneric<IUser>>(APIRoutes.register, registerUData, this.headerOptions).then(
        (res) =>{
          if(res.status){
            this._toastreService.success(res.message);
            this._router.navigate(['/login']);
          }
          else{
            this._toastreService.error(res.message);
          }
        }
      )
    }
  }

}
