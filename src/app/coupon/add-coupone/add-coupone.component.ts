import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CouponService } from '../coupon.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-coupone',
  templateUrl: './add-coupone.component.html',
  styleUrls: ['./add-coupone.component.css']
})
export class AddCouponeComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  formName: String = 'New category';
  couponId: any = null;
  couponData: any;


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private router: Router,
    private route: ActivatedRoute
  ) {
   this.couponData =  this.route.snapshot.queryParamMap;

   }

  couponForm: FormGroup;

  ngOnInit() {
var data = this.couponData.params;

    this.route.params.subscribe( params => this.couponId = params.id );

    this.couponForm = this.fb.group({
      couponName: ['', Validators.required],
      discountPerscentage: ['', Validators.required],
      maxDiscount: ['', Validators.required],
      couponStatus: ['', Validators.required]
    });

    if (data.id) {

      this.formName = 'Edit category';

      this.couponForm = new FormGroup({
        id: new FormControl(data.id),
        couponName: new FormControl(data.couponName),
        discountPerscentage: new FormControl(data.discountPerscentage),
        maxDiscount: new FormControl(data.maxDiscount),
        couponStatus: new FormControl(data.couponStatus),

      });
      if (Number(data.couponStatus) === 1) {
        this.statusEnabled = true;
      } else {
        this.statusDisabled = true;
      }
    }

  }

  onSubmit() {
    this.submitted = true;

    const couponData = this.couponForm.value;

    var data = this.couponData.params;
    if (data.id) {
      this.editcoupon(couponData, data.id);

      return false;
    }

    this.couponService.couponAdd(couponData).subscribe(
      response => {

        if (response.body['error'] === 'true' ) {

          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });


        } else {

          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigateByUrl('/couponList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editcoupon(couponData, id) {


    this.couponService.editCoupon(couponData).subscribe(
      response => {

        if (response.body['error'] === 'true' ) {

          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });


        } else {

          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigateByUrl('/couponList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}

