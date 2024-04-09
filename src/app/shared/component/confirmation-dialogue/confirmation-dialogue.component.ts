import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrl: './confirmation-dialogue.component.scss'
})
export class ConfirmationDialogueComponent {

  modalRef?: BsModalRef;
  resolve: any;
  public message: string = "Do you want to delete permanently ?"
  constructor(private modalService: BsModalService) {}
 
  @ViewChild('template') template!: TemplateRef<void>;

  public openModal(): Promise<boolean> {
    this.modalRef = this.modalService.show(this.template, { class: 'modal-sm' });
    return new Promise<boolean>((resolve, reject) =>{
      this.resolve = resolve;
    })
  }
 
  public confirm(): void {
    this.resolve(true);
    this.modalRef?.hide();
  }
 
  public decline(): void {
    this.resolve(false);
    this.modalRef?.hide();
  }
}
