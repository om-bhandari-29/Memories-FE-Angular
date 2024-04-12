import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadImageComponent } from '../image/upload-image/upload-image.component';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-right-options',
  templateUrl: './right-options.component.html',
  styleUrl: './right-options.component.scss'
})
export class RightOptionsComponent implements OnInit {

  @ViewChild(UploadImageComponent) UploadImageComponentObj !: UploadImageComponent;


  public isShowAuthenticPart: boolean = false;
  public searchStr: string = "";


  constructor(private _utilService: UtilService) {
  }

  ngOnInit(): void {

    this.isShowAuthenticPart = this._utilService.isUserLoggedInF();
      
    this._utilService.loggedInUser$.subscribe(
      (val) =>{
        this.isShowAuthenticPart = val;
      }
    )
  }

  public uploadImage() {
    this.UploadImageComponentObj.openModal();
  }

  public onSearchTyping(event: Event){
    this._utilService.onPostSearchTyping.emit(this.searchStr);
  }

}
