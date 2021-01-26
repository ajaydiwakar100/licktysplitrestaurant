import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

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


  getResturantData(restaurantId) {
    console.log("restaurantId=====" , restaurantId);
    return this.http.post(this.baseUrl +'getResturantData', {restaurantId :restaurantId}, 
    {
    observe: 'response'
  });
}
  

  reportsSendData(Data) {
    return this.http.post(this.baseUrl +'reportSearch',{Data:Data}, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  outlet(Data) {
    return this.http.post('http://35.155.69.42/foodapp/public/admin/getPayOutletByRestaurant', Data, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  getOrderPage(page) {
    return this.http.get(this.baseUrl + 'listOutletOrders/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
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
