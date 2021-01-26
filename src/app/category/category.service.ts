import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { CategoryList } from './category-list.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  getCategoryList(): Observable<CategoryList[]> {

      return this.http
          .get(this.baseUrl + 'getMainCategoryList', {headers: this.httpHeaders})
          .map((response: Response) => {
              return <CategoryList[]>response['category'];
          })
          .catch(this.handleError);
  }

  getCategory(page) {
    return this.http.get(this.baseUrl + 'ListCategory/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  categoryAdd(categoryData) {
    console.log(categoryData);
    return this.http.post(this.baseUrl + 'addCategory', categoryData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  categoryEdit(bannerData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateCategory', bannerData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  getCategoryEdit(bannerData): Observable<CategoryList[]> {

    return this.http
        .get(this.baseUrl + 'getCategory/' + bannerData, {headers: this.httpHeaders})
        .map((response: Response) => {
            return <CategoryList[]>response['category'];

        })
        .catch(this.handleError);
  }

  deleteCategory(id) {

    return this.http.get(this.baseUrl + 'deleteCategory/' + id, {

      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getOutletsCategoryList(page): Observable<CategoryList[]> {

    return this.http
        .get(this.baseUrl + 'ListCategory/' + page, {headers: this.httpHeaders})
        .map((response: Response) => {
            return <CategoryList[]>response['category'];
        })
        .catch(this.handleError);
}

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }

}
