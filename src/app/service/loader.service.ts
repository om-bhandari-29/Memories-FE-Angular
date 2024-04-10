import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public showLoader$ = new BehaviorSubject<boolean>(false);

  private apiCnt: number = 0;

  constructor() { }

  public showloader(){
    this.apiCnt ++;
    if(this.apiCnt > 0){
      this.showLoader$.next(true);
    }
  }

  public hideloader(){
    this.apiCnt --;
    if(this.apiCnt == 0){
      this.showLoader$.next(false);
    }
  }

}
