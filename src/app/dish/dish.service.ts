import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { DishList } from './dish-list.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  httpHeadersImage = new HttpHeaders({
    'Content-Type': [],
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  getCustomisationList(): Observable<DishList[]> {

      return this.http
          .get(this.baseUrl + 'getListCustomisationCategory', {headers: this.httpHeaders})
          .map((response: Response) => {
              return <DishList[]>response['getList'];
          })
          .catch(this.handleError);
  }

  getEditDish(id) {
    return this.http.get(this.baseUrl + 'getDishes/' + id, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }


  getDish(page) {
    return this.http.get(this.baseUrl + 'listDishes/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }


  getdishreport(outletId) {
    return this.http.post('http://35.155.69.42/foodapp/public/api/listDishes',{outletId :outletId},{
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getCategoryList() {
    
    return this.http.get(this.baseUrl + 'getMainCategoryList', {
      headers: this.httpHeaders,
      observe: 'response'
    });    
    // return this.http.get(this.baseUrl + 'getSubCategory', {
    //   headers: this.httpHeaders,
    //   observe: 'response'
    // });
  }

  dishAdd(dishData) {

    return this.http.post(this.baseUrl + 'addDishes', dishData, {

      headers: this.httpHeadersImage,
      observe: 'response'
    });

  }
  bulkupload(dishData) {

    return this.http.post(this.baseUrl + 'importDishes', dishData, {

      headers: this.httpHeadersImage,
      observe: 'response'
    });

  }

  dishEdit(bannerData) {
    return this.http.post(this.baseUrl + 'updateDishes', bannerData, {

      headers: this.httpHeaders,
      observe: 'response'
    });

  }

  getDishEdit(bannerData): Observable<DishList[]> {

    return this.http
        .get(this.baseUrl + 'getdishCategory/' + bannerData, {headers: this.httpHeaders})
        .map((response: Response) => {
            return <DishList[]>response['get'];

        })
        .catch(this.handleError);
  }

  deleteDish(id) {

    return this.http.get(this.baseUrl + 'deleteDish/' + id, {

      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getOutletsDishList(page): Observable<DishList[]> {

    return this.http
        .get(this.baseUrl + 'listDishes/' + page, {headers: this.httpHeaders})
        .map((response: Response) => {
          console.log(response);
          if (response['error'] === "true" && response['errorMessage'] === "Unauthenticated.") {
            // this.Router.navigateByUrl('');
          } else {
            return <DishList[]>response['list'];
          }
        })
        .catch(this.handleError);
}

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
}
