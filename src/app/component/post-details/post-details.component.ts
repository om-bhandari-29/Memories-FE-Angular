import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from '../../shared/class/ComponentBase.class';
import { IPost, GetALLPostC, IComment } from '../../response/post.response';
import { ActivatedRoute, Params } from '@angular/router';
import { ResponseGeneric } from '../../response/responseG.response';
import { APIRoutes } from '../../shared/constant/APIRoutes.constant';
import { environment } from '../../environment/environment';
import { UtilService } from '../../service/util.service';
import { IUser } from '../../response/user.model';
import { ConfirmationDialogueComponent } from '../../shared/component/confirmation-dialogue/confirmation-dialogue.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent extends ComponentBase{

  public postDetail: GetALLPostC = new GetALLPostC();
  public loggedInUserId: string = "";
  public isSubmit: boolean = false;
  public textArea: FormControl = new FormControl("", Validators.required);

  @ViewChild(ConfirmationDialogueComponent) ConfirmationDialogueComponentObj!: ConfirmationDialogueComponent;

  constructor(private _activatedRoute: ActivatedRoute, public _utilService: UtilService) {
    super();
    this.getJwtToken();

    this._activatedRoute.params.subscribe(
      (param: Params) => {
        const postId:string = param['postId'];
        if (postId) {
          this.getDetails(postId);
        }
      }
    )
  }

  public deletePostById(postId: string){
    this.ConfirmationDialogueComponentObj.openModal().then(
      (res: boolean) =>{
        if(res){
          this.deleteMethodPromise<ResponseGeneric<IUser>>(APIRoutes.deletePostById(postId), this.headerOptions).then(
            (res) =>{
              if(res.status){
                this._toastreService.success(res.message);
                this._router.navigate(['/my-uploads']);
              }
              else{
                this._toastreService.error(res.message);
              }
            }
          )
        }
      }
    )
  }

  public submit(postId: string){
    if((this.textArea.value as string).trim().length < 1)
      this.isSubmit = true;
    else{
      // make api call
      const newComment: { comment: string } ={
        comment: (this.textArea.value as string).trim()
      }

      this.headerOptions.isSilentCall = true;

      this.postMethodPromise<{ comment: string }, ResponseGeneric<IPost<IComment[]>>>(APIRoutes.commentPostById(postId), newComment, this.headerOptions).then(
        (res) =>{
          if(res.status){
            this.textArea.setValue("");
            this._toastreService.success(res.message);
            this.postDetail = res.data;
          }
          else{
            this._toastreService.error(res.message);
          }
        }
      )
    }
  }

  private getDetails(postId: string) {
    this.getMethodPromise<ResponseGeneric<GetALLPostC>>(APIRoutes.getPostDetail(postId), this.headerOptions).then(
      (res) => {
        this.postDetail = res.data;
      }
    )
  }

  private getJwtToken(){
    if(localStorage.getItem(environment.jwtTokenName)){
      if(this._utilService.loggedIdUserId == ""){
        this.getMethodPromise<ResponseGeneric<IUser>>(APIRoutes.getUserDetails, this.headerOptions).then(
          (res) =>{
            this._utilService.loggedIdUserId = res.data._id;
            this.loggedInUserId = res.data._id;
          }
        )
      }
      else{
        this.loggedInUserId = this._utilService.loggedIdUserId;
      }
    }
  }
}
