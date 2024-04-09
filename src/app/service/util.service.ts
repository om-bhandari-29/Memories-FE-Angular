import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public loggedInUser$ = new Subject<boolean>();

  public loggedIdUserId: string = "";

  constructor() { }

  public isUserLoggedInF(): boolean{
    if(localStorage.getItem(environment.jwtTokenName)){
      return true;
    }
    else{
      return false;
    }
  }
  
}
