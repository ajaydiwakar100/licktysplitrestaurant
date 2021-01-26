import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CouponService } from './coupon.service';
import { CouponList } from './coupon-list.model';
import Swal from 'sweetalert2';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  categoryList: CouponList[];
  couponList: any;
  category: any;
  pages: any;
  page = 1;
  state: any;
  couponData : any;
  success: String = null;
  itemsPerPage: Number = 10;

  constructor(
    private router: Router,
    private couponService: CouponService,
  ) {
  }

  ngOnInit() {

    this.couponService.getCouponList(this.page).subscribe(
      response => {
         this.couponList = response['data'];
         this.pages = response['last_page'] * 10;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getCoupon(page) {

    this.couponService.getCouponList(page).subscribe(
      response => {
        this.categoryList = response;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editcategory(categoryId) {

    localStorage.removeItem('editcategory');
    localStorage.setItem('editcategory', categoryId.toString());
    this.router.navigate(['/categoryAdd']);

  }

  addcategory() {
    localStorage.removeItem('editcategory');
    this.router.navigate(['/categoryAdd']);
  }

  // deleteCategory(categoryId) {

  //   Swal({
  //     title: localisation.deleteTitle,
  //     text: localisation.deleteText,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: localisation.deleteConfirmButton
  //   }).then((result) => {
  //     if (result.value) {

  //       this.couponService.deleteCategory(categoryId).subscribe(
  //         res => {

  //           this.categoryList = this.categoryList.filter(categoryList => categoryList.id !== categoryId);

  //           if (res.body['error'] === 'false') {
  //             Swal({
  //               title: localisation.deletedText,
  //               text: localisation.deletedMessage,
  //               type: 'success',
  //               showConfirmButton: false,
  //               timer: 1000
  //             });

  //             this.getCategory(this.page);
  //           } else {
  //             Swal({
  //               title: localisation.deletedErrorText,
  //               text: localisation.deletedErrorMessage,
  //               type: 'warning',
  //               showConfirmButton: false,
  //               timer: 1000
  //             });
  //           }

  //         },
  //         err => {
  //           this.router.navigateByUrl('/serverError');
  //         }
  //       );
  //     }
  //   });

  // }

  editCoupon(coupon){
    var couponData = coupon;
    this.router.navigate(['/addCoupone'], {queryParams: couponData });

  }
}
