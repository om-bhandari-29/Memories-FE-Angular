import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilService } from '../../service/util.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentBase } from '../../shared/class/ComponentBase.class';
import { ResponseGeneric } from '../../response/responseG.response';
import { IUser } from '../../response/user.model';
import { APIRoutes } from '../../shared/constant/APIRoutes.constant';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends ComponentBase implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(public _utilService: UtilService) {
    super();

    if (localStorage.getItem(environment.jwtTokenName)) {
      this.getLoggedInUser();
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this._utilService.isUserLoggedInF();

    this._utilService.loggedInUser$.subscribe((res) => {
      this.isLoggedIn = res;
    })
  }

  public logout() {
    this.isLoggedIn = false;
    this._utilService.loggedInUser$.next(false);
    this._utilService.loggedIdUserId = "";
    localStorage.clear();
    this._toastreService.success("Logged out successfully");
    this._router.navigate(['/']);
  }

  private getLoggedInUser() {
    this._utilService.getLoggedInUser();
  }

}
