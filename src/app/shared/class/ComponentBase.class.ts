import { inject } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IHeaderOption } from "../../model/option.model";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

export class ComponentBase {

  public baseURL: string = `${environment.baseURL}`;
  public isShowBtnLoader: boolean = false;

  // SERVICE
  private _httpClient = inject(HttpClient);
  public _toastreService = inject(ToastrService);
  public _router = inject(Router);

  public headerOptions: IHeaderOption = {
    isSilentCall: false
  }

  public getMethodPromise<D>(url: string, myHeaders: IHeaderOption): Promise<D> {

    let isSilentCall: boolean = false;

    if(myHeaders.isSilentCall){
      isSilentCall = true;
    }

    const myHeader: HttpHeaders = new HttpHeaders({
      "is-silent-call": (isSilentCall) ? "true" : "false"
    })
    
    const hitUrl: string = `${this.baseURL}${url}`;
    const newPromise = new Promise<D>((resolve, reject) => {
      this._httpClient.get<D>(hitUrl, { headers: myHeader }).subscribe({
        next: (res) => {
          this.isShowBtnLoader = false;
          resolve(res);
        },

        error: (err) => {
          this.isShowBtnLoader = false;
          reject(err);
          this._toastreService.error(err.msg);
        }
      })
    });

    return newPromise;
  }

  public postMethodPromise<D, R>(url: string, data: D, myHeaders: IHeaderOption): Promise<R> {

    // console.log(option);
    let isSilentCall: boolean = false;

    if(myHeaders.isSilentCall){
      isSilentCall = true;
    }

    const myHeader: HttpHeaders = new HttpHeaders({
      "is-silent-call": (isSilentCall) ? "true" : "false"
    })

    const hitUrl: string = `${this.baseURL}${url}`;
    const newPromise = new Promise<R>((resolve, reject) => {
      this._httpClient.post<R>(hitUrl, data, { headers: myHeader }).subscribe({
        next: (res) => {
          this.isShowBtnLoader = false;
          resolve(res);
        },

        error: (err) => {
          this.isShowBtnLoader = false;
          reject(err);
          this._toastreService.error(err.msg);
        }
      })
    });

    return newPromise;
  }
  public putMethodPromise<D, R>(url: string, data: D, myHeaders: IHeaderOption): Promise<R> {

    // console.log(option);
    let isSilentCall: boolean = false;

    if(myHeaders.isSilentCall){
      isSilentCall = true;
    }

    const myHeader: HttpHeaders = new HttpHeaders({
      "is-silent-call": (isSilentCall) ? "true" : "false"
    })

    const hitUrl: string = `${this.baseURL}${url}`;
    const newPromise = new Promise<R>((resolve, reject) => {
      this._httpClient.put<R>(hitUrl, data, { headers: myHeader }).subscribe({
        next: (res) => {
          this.isShowBtnLoader = false;
          resolve(res);
        },

        error: (err) => {
          this.isShowBtnLoader = false;
          reject(err);
          this._toastreService.error(err.msg);
        }
      })
    });

    return newPromise;
  }

  public deleteMethodPromise<R>(url: string, option: IHeaderOption): Promise<R> {
    const hitUrl: string = `${this.baseURL}${url}`;
    const newPromise = new Promise<R>((resolve, reject) => {
      this._httpClient.delete<R>(hitUrl).subscribe({
        next: (res) => {
          this.isShowBtnLoader = false;
          resolve(res);
        },

        error: (err) => {
          this.isShowBtnLoader = false;
          reject(err);
          this._toastreService.error(err.msg);
        }
      })
    });

    return newPromise;
  }

}