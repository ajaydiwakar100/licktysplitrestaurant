import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { OrderList } from './order-list.model';
import { OrderPreviousList } from './order-previous-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList: OrderList[];
  order: any;
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;
  pagePrevious = 1;
  orderPreviousList: OrderPreviousList[];

  constructor(
    private orderService: OrderService,
    private router: Router,
    // private sidebarComponent: SidebarComponent
  ) { }

  ngOnInit() {

    this.orderService.getOutletsOrderList(this.page).subscribe (
      response => {

         this.orderList = response;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.orderService.getOrderPage(this.page).subscribe(
      response => {
        console.log(response)
        this.pages = response.body['totalPage'] * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.orderService.getOutletsOrderPreviousList(this.pagePrevious).subscribe (
      response => {

         this.orderPreviousList = response;
        console.log(response);
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.orderService.getPreviousOrderPage(this.pagePrevious).subscribe(
      response => {

        this.pagePrevious = response.body['totalPage'] * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );



  }

  getOrder(page) {

    this.orderService.getOutletsOrderList(page).subscribe(
      response => {
console.log(response)
        this.orderList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getOrderPrevious(page) {

    this.orderService.getOutletsOrderPreviousList(page).subscribe(
      response => {

        this.orderPreviousList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }
  takeaway(orderid){
    var data = { orderId: orderid , orderStatus: 1 , isConfirmed: 1 }
    let that = this;
    Swal({
     title: 'Are you sure?',
     text: "",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, Delivered it!',
     cancelButtonText: 'No, cancel!',
     confirmButtonClass: 'btn btn-success',
     cancelButtonClass: 'btn btn-danger',
     buttonsStyling: false
   }).then(function(isConfirm) {
     if (isConfirm.value === true) {

       
   that.orderService.takeawaydeliver(data).subscribe(
     response => {
       

    
     },
         err => {
           console.log(err);
         }
       );
       Swal(
         'Delivered!',
         'success'
       );
     } else if (isConfirm.dismiss) {
       Swal(
         'Cancelled',
         '',
         'error'
       );
     } else {
       // Esc, close button or outside click
       // isConfirm is undefined
     }
   })
 
     // err => {
     //   this.router.navigateByUrl('/serverError');
     // }
   //);
  }
  confirmStatus(orderId) {

    Swal({
      title: localisation.deleteTitle,
      text: localisation.confirmOrderText,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: localisation.confirmOrderButton,
      cancelButtonText: localisation.rejectOrderButton
    }).then((result) => {
      if (result.value) {

        const confirmDate = {orderId: orderId, orderStatus: 1, isConfirmed: 1};

        this.orderService.confirmOrder(confirmDate).subscribe(
          res => {



            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.confirmedText,
                text: localisation.confirmedMessage,
                type: 'success',
                timer: 1000,
                showConfirmButton: false
              });
            } else {
              Swal(
                localisation.confirmedErrorText,
                localisation.confirmedErrorMessage,
                'warning'
              );
            }

            this.getOrder(this.page);

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        const confirmDate = {orderId: orderId, orderStatus: 0, isConfirmed: 0};

        this.orderService.confirmOrder(confirmDate).subscribe(
          res => {



            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.rejectedText,
                text: localisation.rejectedMessage,
                type: 'warning',
                timer: 1000,
                showConfirmButton: false
              });

            } else {
              Swal(
                localisation.rejectedErrorText,
                localisation.rejectedErrorMessage,
                'warning'
              );
            }

            this.getOrder(this.page);

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );

      }
    });

  }
  public setintervalid = setInterval(() => {
    this.getOrder(this.page);
  }, 10000);
}
