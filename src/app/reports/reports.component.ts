import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
// import { localisation } from '../../../localisation/localisation';
import { ReportsService } from './reports.service';
import { registerOutsideClick } from 'ngx-bootstrap';
import { exit } from 'process';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    
  fromdate: any;
  outlets: any;
  provider: any;
  todate: any;
  selectedItems =[];
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;
  pagePrevious = 1;
  restaurantId: any;
  restaurant: any;
  fromdatedata: any;
  outletdata: any;
  outletdata1:any;
  providerdata: any;
  todatedata: any;
  orderdata: any;
  outlet_id:any;
  fromDayDate: any = new Date();
  toDayDate: any = new Date();

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(this.currentYear - 5, 12, 31);
  public maxDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  public tominDate: Object = new Date(this.currentYear - 5, 12, 31);
  public tomaxDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  result: any;
  excelResult: any = [];
  serviceSettings = {};
  serviceList: any[];
  a = [];
  serviceList1: any[];
  orderlis: any[];
  orderlis1: any[];
  b =[];
  c =[];
  j =[];

  constructor(
    private reportService: ReportsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fromdatedata = ''
    this.todatedata =''
    this.outletdata = sessionStorage.getItem('outletid');
    //console.log(this.restaurantId);
    this.reportService.reportsSendData(this.page).subscribe(
    
      response => {
        console.log(response)
        this.result = response.body['results'].data
        this.pages = response.body['results'].total;
      });
    
    // this.route.params.subscribe( params => this.orderId = params.id );
    this.serviceSettings = {
      // singleSelection: false,
      // text:"Select Service",
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // enableSearchFilter: true,
      // //SelectAll: false,
      // //UnSelectAll: false,
      // classes: "myclass custom-class",
      // lazyLoading: false
      // //itemsShowLimit: 1,
      // //allowSearchFilter: true
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    }; 
    this.orderlis =[ {"id":'1',"itemName":'unassigned'},{"id":'2',"itemName": 'accepted'},{"id":'3',"itemName":'rejected'},{"id":'4',"itemName":'pickedup'},{"id":'5',"itemName":'delivered'},{"id":'6',"itemName":'confirmed'},{"id":'7',"itemName":'assigned'},{"id":'8',"itemName":'reachOutlet'},{"id":'9',"itemName":'reachUserLocation'}]
    this.orderlis1 = this.orderlis;

    //this.route.params.subscribe( params => this.restaurantId = params.id );
    
    this.restaurantId = sessionStorage.getItem('outletid');
    console.log(this.restaurantId);
    const val = this.restaurantId;
    console.log(val);
    
    this.reportService.getResturantData(this.restaurantId).subscribe (
      response => {
        
        console.log(response.body);

        const order = response.body['reports'];
      
        this.restaurant = order.restaurants;
        this.provider = order.provider;
        this.fromdate = order.ordersdate;
        this.todate = order.ordersdate;
        this.outlets = order.outlets;
        var statelist = [];
        // order.outlets.filter((x) => {
        //   statelist.push({"id": x['id'], "itemName": x['name']});
        // });
        //  this.serviceList = statelist;

        //  statelist.array.forEach(element => {
        //    arr.push({""})
        //  });
        var statelist1 = [];
        order.provider.filter((x) => {
              statelist1.push({"id": x['id'], "itemName": x['name']});
        });
        this.serviceList1 = statelist1;
        console.log(this.serviceList1);
        // console.log(this.serviceList1);
//          for(var i = 0, len = statelist.length; i < len; i++) {
//           // console.log(this.serviceList[i].id);
//           let id = statelist[i].id;
//           this.a.push(id);
//         }
//         var NAMES = [];
// for (let i = 1; i < 100; i++) {
//     let newName = i
//     NAMES.push(newName);
// }
//         console.log(NAMES);
//         console.log(this.a);
        //  this.deliveryAddressType = order.deliveryAddressType;
        //  this.deliveryAddress = order.deliveryAddress;
        //  this.orderReferenceId = order.orderReferenceId;
        //  this.orderStatus = order.orderStatus;
        //  this.netAmount = order.netAmount;
        //  this.userMobileNumber = order.userMobileNumber;
        //  this.userEmail = order.userEmail;
        //  this.staffName = order.staffName;
        //  this.staffMobileNumber = order.staffMobileNumber;
        //  this.staffeEmail = order.staffeEmail;
        //  this.paymentname = order.paymentDetails['name'];
        //  this.dishes = order.dishes;
        //  this.userName = order.userName;
        //  this.billTotals = order.billTotals;

      },
      err => {
        // this.router.navigateByUrl('/serverError');
      }
    );
   
  }

filter(page) {

const senddata :{[key:string]: any} = {}; 

  if(this.fromdatedata == undefined || this.fromdatedata == '') {
    this.fromdatedata = null;
  }
  if(this.todatedata == undefined || this.todatedata == '') {
    this.todatedata = null;
  }
  if(this.outletdata == undefined || this.outletdata == '') {
    this.outletdata = null;
  }
  if(this.providerdata == undefined || this.providerdata == '') {
    this.providerdata = null;
  }
  if(this.orderdata == undefined || this.orderdata == '') {
    this.orderdata = null;
  }

  // console.log(this.fromdatedata,this.todatedata,this.providerdata,this.outletdata);

if (this.fromdatedata == null && this.todatedata == null && this.providerdata == null && this.outletdata == null) {
// console.log("select any one select box");
}

if (this.fromdatedata != null &&  this.outletdata == null &&  this.providerdata == null && this.orderdata ==null && this.todatedata == null) {
  senddata.type = 'one';
} else if (this.fromdatedata == null && this.outletdata != null && this.providerdata == null && this.orderdata ==null && this.todatedata == null) {
  senddata.type = 'two';  
  
} else if (this.fromdatedata == null && this.outletdata == null && this.providerdata != null && this.orderdata ==null && this.todatedata == null) {
  senddata.type = 'three';
  
}  else if (this.fromdatedata == null && this.outletdata == null && this.providerdata == null && this.orderdata ==null && this.todatedata != null) {
  senddata.type = 'four';  
  
}
else if(this.fromdatedata == null && this.outletdata == null && this.providerdata == null && this.orderdata !=null && this.todatedata == null){
  senddata.type = 'five';
} 
else if (this.fromdatedata != null &&  this.outletdata != null) {
  if (this.fromdatedata != null &&  this.outletdata != null && this.providerdata != null && this.todatedata == null) {
    senddata.type = 'one&two&three';
  } else {
    if (this.fromdatedata != null &&  this.outletdata != null && this.providerdata != null && this.todatedata != null) {
      senddata.type = 'one&two&three&four';
    } else {
      if (this.fromdatedata != null && this.outletdata != null ) {
        senddata.type = 'one&two';
      } else {
        senddata.type = 'one&two&four';
      }
    }
  }
  
} 
 else if (this.fromdatedata != null &&  this.outletdata != null && this.providerdata != null ) {
  senddata.type = 'one&two&three';  
  
} else if (this.outletdata != null &&  this.providerdata != null && this.todatedata != null) {
  senddata.type = 'two&three&four';  
  
} else if (this.fromdatedata != null &&  this.providerdata != null && this.todatedata != null) {
  senddata.type = 'one&three&four';  
  
} else if (this.fromdatedata != null &&  this.outletdata != null && this.todatedata != null) {
  senddata.type = 'one&two&four';  
  
} else if (this.fromdatedata != null &&  this.outletdata != null && this.providerdata != null && this.todatedata != null) {
  senddata.type = 'one&two&three&four';
  
} else if (this.outletdata != null &&  this.providerdata != null) {
  senddata.type = 'two&three';  
  
} else if (this.providerdata != null &&  this.todatedata != null) {
  senddata.type = 'three&four';  
  
} else if (this.fromdatedata != null &&  this.providerdata != null) {
  senddata.type = 'one&three';  
  
} else if (this.fromdatedata != null &&  this.todatedata != null) {
  senddata.type = 'one&four';  
  
} else if (this.fromdatedata != null &&  this.orderdata != null) {
  senddata.type = 'one&five';  
  
}else if (this.outletdata != null &&  this.todatedata != null) {
  senddata.type = 'two&four';  
  
}
else if (this.outletdata != null &&  this.orderdata != null) {
  senddata.type = 'two&five';  
  
}
if(this.outletdata != null){
  for(var i = 0, len = this.outletdata.length; i < len; i++) {
    let id = this.outletdata[i].id
    this.b.push(id)
    }}
    if(this.providerdata != null){
    for(var u = 0, len1 = this.providerdata.length; u < len1; u++) {
      let id1 = this.providerdata[u].id
      console.log(id1);
      this.c.push(id1)
      }}
      if(this.orderdata != null){
        for(var u = 0, len1 = this.orderdata.length; u < len1; u++) {
          let id1 = this.orderdata[u].itemName
          this.j.push(id1)
          }
      }

    var data = {RestaurantId: sessionStorage.getItem('outletid') }
      this.reportService.outlet(data).subscribe(
        response => {
          console.log(response)
          var statelist = [];
          response.body['listOrders'] === undefined ? "" : response.body['listOrders'].filter((x) => {
           statelist.push({ "item_id": x['id'], "item_text": x['name'] });
          });
          this.serviceList = statelist;
    });  

senddata.fromData = this.formatDate(this.fromdatedata);
senddata.outletData = sessionStorage.getItem('outletid');
senddata.providerData = this.c;
senddata.orderData = this.j;
senddata.toData = this.formatDate(this.todatedata);
senddata.page = page; 


this.reportService.reportsSendData(senddata).subscribe (
  response => {
    this.excelResult = [];

     this.result = response.body['results'].data;
     this.pages = response.body['results'].total;
     const totalData = response.body['results'].data;
     
       totalData.map((x, i) => {
        const sampData: {[key: string]:any} = {};
          sampData.OrderId = x.id;
          sampData.OrderedAt = x.orderPlaceTime;
          sampData.User = x.username;
          if(x.PaymentTypeId == 10){
            sampData.paid_online ="Yes";
          }
          else{
            sampData.paid_online = "No"; 
          }
          sampData.subtoatl = "$" + x.netAmount ;
          // sampData.order_total = "1234";
          sampData.tax	 =  x.tax + "%";
          sampData.commission	 = "$" + x.adminServiceCharge ;
          sampData.convenience_Fee =x.convenienceFee + "%";
          sampData.promo_amount = "$" + x.discount;
          sampData.driver_tip = "1234";
          sampData.delivery_fee	 = "$" + x.deliverycharge ;
          sampData.mileage	 = "1234";
          sampData.delivery	 = x.deliverycharge +"%";
          this.excelResult.push(sampData);

      });

  },
  err => {
    // this.router.navigateByUrl('/serverError');
  }
);

}

exportAsXLSX():void {
  if (this.excelResult.length === 0) {
    Swal({
      title: 'Error',
      text: 'Orders Data has empty',
      type: 'error',
      confirmButtonText: 'Ok',
    });
  } else {
    this.reportService.exportAsExcelFile(this.excelResult, 'reports');
  }
}


formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
onItemSelect(item:any){
        console.log(item.itemName);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
}
