import { Component, OnInit, inject } from '@angular/core';
import { ComponentBase } from '../../../../shared/class/ComponentBase.class';
import { APIRoutes } from '../../../../shared/constant/APIRoutes.constant';
import { GetALLPost } from '../../../../response/post.response';
import { ResponseGeneric } from '../../../../response/responseG.response';
import { UtilService } from '../../../../service/util.service';
import { IUser } from '../../../../response/user.model';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent extends ComponentBase implements OnInit {

  public postList: GetALLPost[] = [];
  public isMyUpload: boolean = false;
  public isUserLoggedIn: boolean = false;

  public _utilService = inject(UtilService);

  ngOnInit(): void {
    this.getLoggedInUser();
    this.checkisMyUploadRouteF();
    this.isUserLoggedIn = this._utilService.isUserLoggedInF();

    this._utilService.loggedInUser$.subscribe((res) =>
      this.isUserLoggedIn = res);
  }

  public navigateToPostDetails(postId: string) {
    this._router.navigate([`/${postId}`]);
  }

  public likeUnlikePost(index: number, isToLike: boolean) {
    let url = APIRoutes.unLikePost;
    if (isToLike) {
      url = APIRoutes.likePost;
    }

    const postData: { postId: string } = {
      postId: this.postList[index]._id
    }

    this.headerOptions.isSilentCall = true;

    this.putMethodPromise<{ postId: string }, ResponseGeneric<null>>(url, postData, this.headerOptions).then(
      (res) => {
        if (res.status) {
          if (isToLike) {
            this.postList[index].likes.push(this._utilService.loggedIdUserId);
          }
          else {
            let idx = this.postList[index].likes.findIndex((userId) => userId == this._utilService.loggedIdUserId);
            this.postList[index].likes.splice(idx, 1);
          }
        }
      }
    )
  }

  public showNotification() {
    this._toastreService.info("Please login to like or dislike posts");
  }

  private getAllPostM(url: string) {
    this.getMethodPromise<ResponseGeneric<GetALLPost[]>>(url, this.headerOptions).then(
      (res) => {
        this.postList = res.data;
      }
    )
  }

  private checkisMyUploadRouteF() {
    if (this._router.url == '/my-uploads') {
      this.getAllPostM(APIRoutes.myUploads);
      this.isMyUpload = true;
    }
    else {
      this.getAllPostM(APIRoutes.getAllPost);
      this.isMyUpload = false;
    }
  }

  private getLoggedInUser() {
    if(localStorage.getItem(environment.jwtTokenName)){
      this.getMethodPromise<ResponseGeneric<IUser>>(APIRoutes.getUserDetails, this.headerOptions).then(
        (res) => {
          this._utilService.loggedIdUserId = res.data._id;
        }
      )
    }
  }
}
