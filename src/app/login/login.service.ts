import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('tempAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) { }

  post(apiData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'loginRestaurantAdmin', apiData, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  changePassword(apiData) {

    return this.http.post(this.baseUrl + 'changePassword', apiData, {

      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  logout() {
    sessionStorage.clear();
  }

}
