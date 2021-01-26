import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  changePasswordForm: FormGroup;

  ngOnInit() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    this.changePasswordForm = this.fb.group({
      oldPassword: [''],
      password: [''],
      newPassword: ['']
    });

  }

  onSubmit() {
    const changePasswordData = this.changePasswordForm.value;
    var email = sessionStorage.getItem('email');
    const changePasswordDatanew = {
      email: email,
      oldpassword: changePasswordData.oldPassword,
      password: changePasswordData.password
    }
    if (this.changePasswordForm.dirty && this.changePasswordForm.valid) {
      if (changePasswordData.password === changePasswordData.newPassword) {
        // console.log(changePasswordDatanew);
        this.loginService.changePassword(changePasswordDatanew).subscribe(
          response => {
            if (response.body['error'] === 'true') {
              Swal({
                title: 'Error',
                text: response.body['errorMessage'],
                type: 'error',
                confirmButtonText: 'Ok',
              });
              // current password is invalid
            } else {

              Swal({
                title: 'Success',
                text: response.body['errorMessage'],
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then(() => {
                this.router.navigateByUrl('/');
              });
            }

          },
          error => {
            this.router.navigateByUrl('/serverError');
          }
        );
      } else {
        Swal({
          title: 'Error',
          text: 'New and Confirm Password Should be same',
          type: 'error',
          confirmButtonText: 'Ok',
        });
      }      
    } else {
      Swal({
        title: 'Error',
        text: 'All Fields are Mandatory',
        type: 'error',
        confirmButtonText: 'Ok',
      });
    }

  }

  ngOnDestroy(): void {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.add('theme-orange');
  }

}
