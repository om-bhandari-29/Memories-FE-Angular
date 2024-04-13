import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageFormData, ImageModel } from '../../../../model/image.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConvertToBase64 } from '../../../../shared/class/ConvertToBase64.class';
import { ComponentBase } from '../../../../shared/class/ComponentBase.class';
import { ResponseGeneric } from '../../../../response/responseG.response';
import { APIRoutes } from '../../../../shared/constant/APIRoutes.constant';
import { UtilService } from '../../../../service/util.service';
import { IComment, IPost } from '../../../../response/post.response';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent extends ComponentBase {

  private ConvertToBase64Obj = new ConvertToBase64();

  public image: string = "";
  public isImageValidation: boolean = false;

  @ViewChild('template') modalTemplate!: TemplateRef<void>;

  modalRef?: BsModalRef;

  public uploadImageForm: FormGroup<ImageModel> = new FormGroup<ImageModel>({
    image: new FormControl(null, [Validators.required]),
    imageName: new FormControl(null, [Validators.required]),
    imageDescription: new FormControl(null, Validators.required)
  });


  constructor(private modalService: BsModalService, private _utilService: UtilService) {
    super();
  }

  openModal() {
    this.uploadImageForm.reset();
    this.modalRef = this.modalService.show(this.modalTemplate, { class: 'modal-lg' });
  }


  public submit() {
    this.uploadImageForm.markAllAsTouched();

    if (this.isImageValidation) {
      this._toastreService.error("Only image is allowed");
      this.uploadImageForm.controls.image.reset();
    }
    else {
      if (this.uploadImageForm.valid) {
        const imageData: ImageFormData = {
          image: this.image,
          imageName: (this.uploadImageForm.controls.imageName.value as string).trim(),
          imageDescription: (this.uploadImageForm.controls.imageDescription.value as string).trim()
        }

        this.postMethodPromise<ImageFormData, ResponseGeneric<IPost<IComment[]>>>(APIRoutes.uploadImage, imageData, this.headerOptions).then(
          (res) => {
            if (res.status) {
              this._utilService.updateImageList.emit(res.data)
              this.modalRef?.hide();
              this._toastreService.success(res.message);
            }
            else {
              this._toastreService.error(res.message);
            }
          }
        )
      }
    }

  }

  public onFileSelect(event: any) {
    let fileType: string = event.target.files[0].type;
    if (fileType.startsWith('image')) {
      this.isImageValidation = false;
      this.ConvertToBase64Obj.imageToBase64Promise(event).then(
        (res) => {
          this.image = res;
        }
      )
    }
    else {
      this._toastreService.error("Only Image is Allowed");
      this.image = "";
      this.isImageValidation = true;
    }
  }

  public closeModal() {
    this.modalRef?.hide();
  }
}
