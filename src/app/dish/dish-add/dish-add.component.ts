import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { DishService } from '../dish.service';
import { DishList } from '../dish-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../../localisation/localisation';
import { DISABLED } from '@angular/forms/src/model';
import { stringify } from '@angular/core/src/render3/util';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-dish-add',
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent implements OnInit {
  formName: String = 'New Dish';
  userAdd: any;
  dishGroupList: any;
  value = 0;
  dishCategoryList: any;
  hideCategory: Boolean = false;
  dishForm: FormGroup;
  hideImage: Boolean = true;
  showCustomisation: Boolean = false;
  submitCust: Boolean = false;
  submitDisable: Boolean = false;
  showCustomisationGroup: Boolean = false;
  selectedImage: File = null;
  url: any = '';
  hideSlash: Boolean  = true;
  dishId: any;
  image: any;
  submitted = false;
  imageValidate: Boolean = false;
  isContained: String;
  finalValue: any = 0;
  vegChecked: Boolean;
  statusChecked: Boolean;
  recommendedChecked: Boolean;
  custChecked: Boolean;
  dishIdd: any;
  customisationStatus: any;
  customisationCategory: any;
  minToTime: any;

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  
  numberOnly2(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;

  }
  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }
  ngOnInit() {
    this.customisationStatus = '';
    this.route.params.subscribe( params => this.dishId = params.id );


    this.dishForm = this.fb.group({
      'categoryId': ['', Validators.required],
      'name': ['', Validators.required],
      'price': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'slashedPrice': [''],
      'quantity': ['', Validators.required],
      'description': [''],
      'showFromTime': ['', Validators.required],
      'showToTime': ['', Validators.required],
      'isVeg': ['', Validators.required],
      'isRecommended': ['', Validators.required],
      'image': ['', Validators.required],
      'status': ['', Validators.required],
      'isCustomisation': ['', Validators.required],
      'customisationGroupSelect': this.fb.array([
        this.initGroupSelect()
      ]),
      // 'customisationGroupMax': ['',Validators.required],
      'customisationCategory': this.fb.array([
        this.initGroup()
      ]),
    });
    if (this.dishId) {
      this.formName = 'Edit Dish';
      this.dishService.getEditDish(this.dishId).subscribe(
        response => {
          const dish = response['body']['dishes'];
          this.dishIdd = dish.dishId;
          this.dishForm = this.fb.group({
            'categoryId': [dish.categoryId],
            'name': [dish.name],
            'price': [dish.price],
            'slashedPrice': [dish.slashedPrice],
            'quantity': [dish.quantity],
            'showFromTime': [dish.showFromTime],
            'showToTime': [dish.showToTime],
            'isVeg': [dish.isVeg],
            'isRecommended': [dish.isRecommended],
            'image': [''],
            'status': [dish.status],
            'isCustomisation': [dish.isCustomisation],
            'customisationGroupSelect': this.fb.array([
              this.initGroupSelect()
            ]),
            'customisationCategory': this.fb.array([
                this.initGroup()
            ])
          });
          if (dish.slashedPrice == 0) {
            this.hideSlash = true;
          } else {
            this.hideSlash = false;
          }
          if (dish.isVeg === 1) {
            this.vegChecked = true;
          } else {
            this.vegChecked = false;
          }
          if (dish.status === 1) {
            this.statusChecked = true;
          } else {
            this.statusChecked = false;
          }
          if (dish.isRecommended === 1) {
            this.recommendedChecked = true;
          } else {
            this.recommendedChecked = false;
          }
          if (dish.isCustomisation === 1) {
              const body = document.getElementById('1');
              body.classList.add('active');
              this.showCustomisation = true;
              this.submitDisable = true;
              this.showCustomisationGroup = true;
              this.custChecked = true;
          } else {
              this.showCustomisation = false;
              this.submitDisable = false;
              this.showCustomisationGroup = false;
              const body = document.getElementById('1');
              body.classList.add('active');
              this.custChecked = false;
          }
          this.url = dish.image;
          // customisationArray
          const control = <FormArray>this.dishForm.controls['customisationCategory'];
          control.removeAt(0);
          let ix = 0;
          console.log(dish.customisationCategory);
          dish.customisationCategory.forEach(element => {
            control.push(
              this.fb.group({
                'customisationCategoryId': [element.categoriesPathId],
                'customisationType': [''],
                "customisationGroupMax": [element.customisationGroupMax],
                "customisationGroupMin": [element.customisationGroupMin],
                'customisationItem': this.fb.array([
                  this.initItem()
                ])
              })
            );
            const controlItem = (<FormArray>this.dishForm.controls['customisationCategory']).at(ix).get('customisationItem') as FormArray;
            controlItem.removeAt(0);
            element.customisationItem.forEach(element => {
              controlItem.push(
                this.fb.group({
                  "categoriesMainId": element.customisationCategoryId,
                  "isId": "Yes",
                  'name': [element.name],
                  'price': [element.Price],
                  'isVeg': [element.isVeg],
                  'selected': [element.selected],
                })
              );
            });
            ix++;
          });
        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }
    this.dishService.getCustomisationList().subscribe(
      response => {
         this.dishGroupList = response;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
    this.dishService.getCategoryList().subscribe(
      response => {
         this.dishCategoryList = response['body']['category'];
        // console.log(this.dishCategoryList);
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }
  initGroupSelect() {
    return this.fb.group({
      'groupId': ['']
    });
  }


  initGroup() {
    return this.fb.group({
      'customisationCategoryId': [''],
      'customisationType': [''],
      'customisationGroupMax':[''],
      'customisationGroupMin': [''],
      'customisationItem': this.fb.array([
        this.initItem()
      ])
    }, {  
      validators: [maxValueValidator]
    });
  }
  initItem() {
    return this.fb.group({
      "isId": "No",
      'name': [''],
      'price': [''],
      'isVeg': [false],
      'selected': [false],
    });
  }
  deleteRow(ix) {
    const control = <FormArray>this.dishForm.controls['customisationCategory'];
    control.removeAt(ix);
  }
  addRow() {
    const control = <FormArray>this.dishForm.controls['customisationCategory'];
    control.push(this.initGroup());
  }
  addGroup() {
    const control = <FormArray>this.dishForm.controls['customisationGroupSelect'];
    control.push(this.initGroupSelect());
  }
  deleteItem(ix, iy) {
    const control = (<FormArray>this.dishForm.controls['customisationCategory']).at(ix).get('customisationItem') as FormArray;
    control.removeAt(iy);
this.customisationStatus = control;
  }
  addItem(ix) {
    const control = (<FormArray>this.dishForm.controls['customisationCategory']).at(ix).get('customisationItem') as FormArray;
    control.push(this.initItem());
  }
  get f() { return this.dishForm.controls; }
  onSubmit() {
    this.submitted = true;
    const dishData = this.dishForm.value;
    //console.log(Date.parse(dishData.showFromTime)); 
    
   // if(Date.parse(dishData.showFromTime) < Date.parse(dishData.showToTime) && Date.parse(dishData.showFromTime) != Date.parse(dishData.showToTime)){

      if (this.dishId) {
    
        const dishEncodedData = new FormData();
        dishEncodedData.append('image', this.selectedImage);
        dishEncodedData.append('name', dishData.name);
        dishEncodedData.append('price', dishData.price);
        dishEncodedData.append('slashedPrice', dishData.slashedPrice);
        dishEncodedData.append('quantity', dishData.quantity);
        dishEncodedData.append('isRecommended', dishData.isRecommended);
        dishEncodedData.append('isVeg', dishData.isVeg);
        dishEncodedData.append('categoryId', dishData.categoryId);
        dishEncodedData.append('showFromTime', dishData.showFromTime);
        dishEncodedData.append('showToTime', dishData.showToTime);
        dishEncodedData.append('isCustomisation', dishData.isCustomisation);
        dishEncodedData.append('dishId', this.dishIdd);
        if (dishData.isCustomisation == '1') {
          dishEncodedData.append('customisationCategory', JSON.stringify(dishData.customisationCategory));
        } else {
          this.customisationCategory = [{"customisationCategoryId":"","customisationType":"","customisationItem":[{"isId":"Yes","name":"","price":"","isVeg":false,"selected":false}]}];
          dishEncodedData.append('customisationCategory', this.customisationCategory);
        }
        dishEncodedData.append('status', dishData.status);


        
        // console.log(dishEncodedData);
        // // if (this.dishForm.dirty && this.dishForm.valid) {
        this.dishService.dishEdit(dishEncodedData).subscribe(
          response => {
            if (response.body['error'] === 'true') {
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
                this.router.navigateByUrl('/dishList');
              });
            }
          },
          error => {
            this.router.navigateByUrl('/serverError');
          }
        );
        // } else {
        //   Swal({
        //     title: 'Error',
        //     text: 'All Fields are Mandatory ',
        //     type: 'error',
        //     confirmButtonText: 'Ok',
        //   });
        // }
        return false;
      }
      else {
          if (this.selectedImage === null) {
            this.image = '';
          } else {
            this.image = this.selectedImage;
      }
      const dishEncodedData = new FormData();
      dishEncodedData.append('image', this.image);
      dishEncodedData.append('name', dishData.name);
      dishEncodedData.append('price', dishData.price);
      dishEncodedData.append('slashedPrice', dishData.slashedPrice);
      dishEncodedData.append('quantity', dishData.quantity);
      dishEncodedData.append('isRecommended', dishData.isRecommended);
      dishEncodedData.append('isVeg', dishData.isVeg);
      dishEncodedData.append('categoryId', dishData.categoryId);
      dishEncodedData.append('showFromTime', dishData.showFromTime);
      dishEncodedData.append('showToTime', dishData.showToTime);
      dishEncodedData.append('isCustomisation', dishData.isCustomisation);
      dishEncodedData.append('customisationCategory', JSON.stringify(dishData.customisationCategory));
      dishEncodedData.append('status', dishData.status);
  //
    console.log(dishEncodedData);
      
        // if (this.dishForm.dirty && this.dishForm.valid) {
      this.dishService.dishAdd(dishEncodedData).subscribe(
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
              this.router.navigateByUrl('/dishList');
            });
          }
        },
        error => {
          this.router.navigateByUrl('/serverError');
        }
      );
  //
        // } else {
        //   Swal({
        //     title: 'Error',
        //     text: 'All Fields are Mandatory ',
        //     type: 'error',
        //     confirmButtonText: 'Ok',
        //   });
        // }
      }
    // }else{
    //   Swal({
    //     title: 'Error',
    //     text: 'To time must greater  than from time',
    //     type: 'error',
    //     confirmButtonText: 'Ok',
    //   });
    // }  
  }

  
  
  getCustomisation() {
    this.hideCategory = false;
    this.submitDisable = false;
    this.submitCust = false;
    // this.showCustomisation = false;
    this.showCustomisationGroup = false;
    const removeBody1 = document.getElementById('1');
    removeBody1.classList.remove('active');
    const removeBody = document.getElementById('2');
    removeBody.classList.remove('active');
    const body = document.getElementById('3');
    body.classList.add('active');
    const body2 = document.getElementById('tab-general');
    body2.classList.remove('active');
    const body3 = document.getElementById('tab-address');
    body3.classList.add('active');
  }
  getCategory() {
    this.hideCategory = true;
    this.showCustomisationGroup = false;
    this.submitCust = true;
    this.submitDisable = true;
    const removeBody = document.getElementById('1');
    removeBody.classList.remove('active');
    const removeBody3 = document.getElementById('3');
    removeBody3.classList.remove('active');
    const body = document.getElementById('2');
    body.classList.add('active');
    const body2 = document.getElementById('tab-general');
    body2.classList.remove('active');
    const body3 = document.getElementById('tab-address');
    body3.classList.add('active');
  }
  uploadImage(value) {
    if (value === '1') {
      this.hideImage = false;
    } else {
      this.hideImage = true;
    }
  }
  isSlashed(value) {
    if (value === '1') {
      this.hideSlash = false;
    } else {
      this.hideSlash = true;
    }
  }
  isCustomisation(value) {
    if (value === '1') {
      const body = document.getElementById('1');
      body.classList.add('active');
      this.showCustomisation = true;
      this.submitDisable = true;
      this.showCustomisationGroup = true;
    } else {
      this.showCustomisation = false;
      this.submitDisable = false;
      this.showCustomisationGroup = false;
    }
  }
  getCustomisationBasic() {
    this.hideCategory = false;
    this.submitDisable = true;
    this.submitCust = false;
    this.showCustomisation = true;
    this.showCustomisationGroup = true;
  }
  handleFileInput(file: FileList) {
    this.selectedImage = file[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = reader.result;
    };
  }

  // imageValidation() {
  //   if (this.hideImage === false) {
  //     return [''];
  //   } else {
  //     return [''];
  //   }
  // }
  ChangeSelected(value) {
    let selectedLength = 0;
    const formData = this.dishForm.value;
    for (let length of formData.customisationCategory) {
      if (length.customisationCategoryId === value) {
        for (let count of length.customisationItem) {
          if (count.selected == true) {
            selectedLength++;
          }
        }
      }
    }


    
    for (let appViewState of this.dishGroupList) {
      if (appViewState.id == value) {
             this.isContained = appViewState.type;
             if (appViewState.type == 'single') {
              if (selectedLength > 1) {
                Swal({
                  title: 'Error',
                  text: 'You Should Choose Only One as Selected',
                  type: 'error',
                  confirmButtonText: 'Ok',
                });
              }
             }
       }
   }
  }





  timeChanged(event)
  {
    //console.log('event :>> ', event);
    this.minToTime = event
  }

  get customCategory(){
    return this.dishForm.get('customisationCategory') as FormArray;
  } 


}
export function maxValueValidator(fb: FormGroup): ValidationErrors | null {
  const maxValue = +fb.get('customisationCategory').value ;
  const minValue = +fb.get('customisationGroupMin').value || 0;
  
  if (minValue > maxValue) {
    return {
      maxValueExceed:
      {
        maxValue,
        minValue
      }
    }
  } else {
    null
  }

}
