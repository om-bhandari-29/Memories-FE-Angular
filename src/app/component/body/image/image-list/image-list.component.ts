import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../../../shared/class/ComponentBase.class';
import { APIRoutes } from '../../../../shared/constant/APIRoutes.constant';
import { GetALLPost } from '../../../../response/post.response';
import { ResponseGeneric } from '../../../../response/responseG.response';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent extends ComponentBase implements OnInit {

  public postList: GetALLPost[] = [];
  public isMyUpload: boolean = false;

  ngOnInit(): void {
    this.checkisMyUploadRouteF();
  }

  public navigateToPostDetails(postId: string){
    this._router.navigate([`/${postId}`]);
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
}
