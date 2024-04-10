import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilService } from '../../service/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private _utilService: UtilService, private _router: Router, private _toastreService: ToastrService) { }

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
    this._toastreService.success("Logged out successfully");
    this._router.navigate(['/']);
  }

}
