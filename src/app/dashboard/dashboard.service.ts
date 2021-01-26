import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  getWidgets() {
    return this.http.get(this.baseUrl + 'getDashboardDetails', {
      observe: 'response',
      headers: this.httpHeaders
    });
  }

  getOrdersChart() {
    return this.http.get(this.baseUrl + 'getOrdersChart', {
      observe: 'response',
      headers: this.httpHeaders
    });
  }

  getRevenueChart() {
    return this.http.get(this.baseUrl + 'getRevenueChart', {
      observe: 'response',
      headers: this.httpHeaders
    });
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}
