import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LayoutService } from './layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from '../../assets/plugins/jquery/jquery.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private listService: LayoutService,
    private router: Router
    ) { }

  ngOnInit() {

    // this.listService.getlistorderspopup().subscribe(
    //   response => {
    //     if (response.body['error'] === 'true') {

    //     } else {
    //       console.log(response.body['orders']);
    //       var orders = response.body['orders'];
    //       orders.filter((x) => {

    //       })

    //       Swal({
    //         title: 'Order',
    //         text: 'You Should Choose Only One as Selected',
    //         type: 'success',
    //         confirmButtonText: 'Ok',
    //       });
    //     }

    //   },
    //   err => {
    //     // this.router.navigateByUrl('/serverError');
    //   }
    // );
    this.autogetlistpopuporders();

  }


  autogetlistpopuporders() {

    this.listService.getlistorderspopup().subscribe(
      response => {
        if (response.body['error'] === 'true') {
          $("ngx-loading-bar").remove();
        } else {
          var orders = response.body['orders'];
          orders.map(async (x, index) => {
            if (x.orderStatus === "unassigned" && x.assignedTime === null && x.confirmedTime === null) {
              await Swal({
                title: 'Order',
                text: 'You have a new order',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'dismiss',
                confirmButtonText: 'View order list'
              }).then((result) => {
                if (result.value) {
                  this.listService.updateViewStatus().subscribe(
                    response => {
                      this.router.navigate(['/orderList']);
                    },
                    err => {
                      this.router.navigateByUrl('/serverError');
                    }
                  );
                // this.router.navigateByUrl('/orderList');
                } else if (result.dismiss) {
                  this.listService.updateViewStatus().subscribe(
                    response => {
                      // this.router.navigate(['/orderList']);
                    },
                    err => {
                      this.router.navigateByUrl('/serverError');
                    });
                } else {
                  // Esc, close button or outside click
                  // isConfirm is undefined
                }
              });
            }
          });
        }

      },
      err => {
        // this.router.navigateByUrl('/serverError');
      }
    );

  }
  swalclose() {
    Swal.close();
  }


    public setintervalid = setInterval(() => {
    console.log('orders popup running');
      this.autogetlistpopuporders()
  }, 7000);

}
