import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { CustomisationList } from './customisation-list.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CustomisationService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  getCustomisationList(page): Observable<CustomisationList[]> {

      return this.http
          .get(this.baseUrl + 'ListCustoimsationCategory/' + page, {headers: this.httpHeaders})
          .map((response: Response) => {
              return <CustomisationList[]>response['customisation'];
          })
          .catch(this.handleError);
  }

  getCustomisation(page) {
    return this.http.get(this.baseUrl + 'ListCustoimsationCategory/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  customisationAdd(customisationData) {

    return this.http.post(this.baseUrl + 'addCustomisationCategory', customisationData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  customisationEdit(bannerData) {

    return this.http.post(this.baseUrl + 'updateCustomisationCategory', bannerData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  getCustomisationEdit(bannerData): Observable<CustomisationList[]> {

    return this.http
        .get(this.baseUrl + 'getCustomisationCategory/' + bannerData, {headers: this.httpHeaders})
        .map((response: Response) => {
            return <CustomisationList[]>response['get'];

        })
        .catch(this.handleError);
  }

  deleteCustomisation(id) {

    return this.http.get(this.baseUrl + 'deleteCustomisationCategory/' + id, {

      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getOutletsCustomisationList(page): Observable<CustomisationList[]> {

    return this.http
        .get(this.baseUrl + 'ListCustoimsationCategory/' + page, {headers: this.httpHeaders})
        .map((response: Response) => {
            return <CustomisationList[]>response['list'];
        })
        .catch(this.handleError);
}

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }

}
