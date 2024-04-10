import { Component } from '@angular/core';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  public showLoader: boolean = false;

  constructor(private _loaderService: LoaderService){
    this._loaderService.showLoader$.subscribe(
      (val: boolean) =>{
        this.showLoader = val;
      }
    )
  }
}
