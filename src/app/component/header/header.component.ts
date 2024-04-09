import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private _utilService: UtilService, private _router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this._utilService.isUserLoggedInF();

    this._utilService.loggedInUser$.subscribe((res) =>{
      this.isLoggedIn = res;
    })
  }

  public logout(){
    this.isLoggedIn = false;
    this._utilService.loggedInUser$.next(false);
    localStorage.clear();

    this._router.navigate(['/']);
  }

}
