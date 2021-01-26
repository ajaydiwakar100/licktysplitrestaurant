import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderList } from '../order-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../../localisation/localisation';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  orderList: OrderList[];
  order: any;
  orderId: Number;
  deliveryAddressType: String;
  deliveryAddress: String;
  orderReferenceId: String;
  orderStatus: String;
  netAmount: Number;
  userMobileNumber: String;
  userEmail: String;
  staffName: String;
  staffMobileNumber: String;
  staffeEmail: String;
  paymentname: any;
  dishes: any;
  userName: String;
  billTotals: any;
  orderSuggestions: any;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => this.orderId = params.id );

    this.orderService.getOrder(this.orderId).subscribe (
      response => {

         console.log(response);
         const order = response.body['orders'];
         this.deliveryAddressType = order.deliveryAddressType;
         this.deliveryAddress = order.deliveryAddress;
         this.orderReferenceId = order.orderReferenceId;
         this.orderStatus = order.orderStatus;
         this.netAmount = order.netAmount;
         this.userMobileNumber = order.userMobileNumber;
         this.userEmail = order.userEmail;
         this.staffName = order.staffName;
         this.staffMobileNumber = order.staffMobileNumber;
         this.staffeEmail = order.staffeEmail;
         this.paymentname = order.paymentDetails['name'];
         this.dishes = order.dishes;
         this.userName = order.userName;
         this.billTotals = order.billTotals;
         this.orderSuggestions = order.orderSuggestions;
      },
      err => {
        // this.router.navigateByUrl('/serverError');
      }
    );
  }

}
