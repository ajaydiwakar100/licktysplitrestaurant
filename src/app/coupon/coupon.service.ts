import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { CouponList } from './coupon-list.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  couponAdd(couponData) {

    return this.http.post(this.baseUrl + 'addCoupon', couponData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  editCoupon(couponData) {

    return this.http.post(this.baseUrl + 'editCoupon', couponData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  getCouponList(page): Observable<CouponList[]> {

    return this.http
        .get(this.baseUrl + 'couponList/' + page, {headers: this.httpHeaders})
        .map((response: Response) => {
            return <CouponList[]>response['CouponList'];
        })
        .catch(this.handleError);
}

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }

}
