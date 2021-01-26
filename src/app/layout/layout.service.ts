import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });


  constructor(private http: HttpClient) {
  }



  getlistorderspopup() {
    return this.http.get(this.baseUrl + 'adminListOrdersPopup', {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  listordersupdate(bannerData) {
    return this.http.post(this.baseUrl + 'updateDishes', bannerData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }
  password(bannerData) {
    return this.http.post(this.baseUrl + 'outletPassword', bannerData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }
  updateViewStatus() {
    return this.http.get(this.baseUrl + 'updateOrderViewStatus', {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}

