import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CustomisationService } from '../customisation.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customisation-add',
  templateUrl: './customisation-add.component.html',
  styleUrls: ['./customisation-add.component.css']
})
export class CustomisationAddComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  typeEnabled: Boolean = false;
  typeDisabled: Boolean = false;
  formName: String = 'New customisation Group';
  customisationId: any = null;
  parentcustomisationList: any;

  constructor(
    private fb: FormBuilder,
    private customisationService: CustomisationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  customisationForm: FormGroup;

  ngOnInit() {

    this.route.params.subscribe( params => this.customisationId = params.id );

    this.customisationForm = this.fb.group({
      name: [''],
      type: ['', Validators.required],
      status: ['', Validators.required]
    });

    if (this.customisationId) {

      this.formName = 'Edit customisation Group';

      this.customisationService.getCustomisationEdit(this.customisationId).subscribe(
        response => {
            this.customisationForm = new FormGroup({
              name: new FormControl(response['name']),
              type: new FormControl(response['type']),
              status: new FormControl(response['status']),
            });

            if (Number(response['status']) === 1) {
              this.statusEnabled = true;
            } else {
              this.statusDisabled = true;
            }

            if (response['type'] === 'single') {
              this.typeEnabled = true;
            } else {
              this.typeDisabled = true;
            }
        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }

  }

  onSubmit() {
    this.submitted = true;

    const customisationData = this.customisationForm.value;

    if (this.customisationId) {
      this.editcustomisation(customisationData, this.customisationId);

      return false;
    }

    this.customisationService.customisationAdd(customisationData).subscribe(
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
            this.router.navigateByUrl('/customisationList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editcustomisation(customisationEdit, id) {

    const customisationData = {
      id: id,
      name: customisationEdit.name,
      type: customisationEdit.type,
      status: customisationEdit.status
    };

    this.customisationService.customisationEdit(customisationData).subscribe(
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
            this.router.navigateByUrl('/customisationList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
