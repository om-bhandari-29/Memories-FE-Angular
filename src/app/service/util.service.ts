import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Subject } from 'rxjs';
import { IComment, IPost } from '../response/post.response';
import { ComponentBase } from '../shared/class/ComponentBase.class';
import { ResponseGeneric } from '../response/responseG.response';
import { IUser } from '../response/user.model';
import { APIRoutes } from '../shared/constant/APIRoutes.constant';

@Injectable({
  providedIn: 'root'
})
export class UtilService extends ComponentBase {


  public updateImageList: EventEmitter<IPost<IComment[]>> = new EventEmitter<IPost<IComment[]>>();


  public loggedInUser$ = new Subject<boolean>();
  public loggedIdUserId: string = "";
  public loggedIdUserName: string = "";



  public isUserLoggedInF(): boolean{
    if(localStorage.getItem(environment.jwtTokenName)){
      return true;
    }
    else{
      return false;
    }
  }

  public getLoggedInUser() {
    this.getMethodPromise<ResponseGeneric<IUser>>(APIRoutes.getUserDetails, this.headerOptions).then(
      (res) => {
        this.loggedIdUserName = res.data.name;
        this.loggedIdUserId = res.data._id;
      }
    )
  }
  
}
