import { Component, OnInit ,ModuleWithProviders } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  formName: String = 'New category';
  categoryId: any = null;
  parentCategoryList: any;
  categoryAdd: any = true;
  

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  categoryForm: FormGroup;

  ngOnInit() {

    this.route.params.subscribe( params => this.categoryId = params.id );

    this.categoryForm = this.fb.group({
      parentId: ['0'],
      categoryName: ['', Validators.required],
      status: ['', Validators.required],
      from_time: ['', Validators.required],
      to_time: ['', Validators.required]
    });

    this.categoryService.getCategoryList().subscribe(
      response => {
        this.parentCategoryList = response;
      },
      error => {

      }
    );

    if (this.categoryId) {
      this.categoryAdd = true;
      this.formName = 'Edit category';
      // this.formName = 'View category';

      const cusineEdit = { categoryesId: this.categoryId };

      this.categoryService.getCategoryEdit(this.categoryId).subscribe(
        response => {
           console.log(response);
            this.categoryForm = new FormGroup({
              
              parentId: new FormControl(response['parentId']),
              categoryName: new FormControl(response['categoryName']),
              status: new FormControl(response['status']),
              from_time : new FormControl(response['from_time']),
              to_time : new FormControl(response['to_time']),
            });

            if (Number(response['status']) === 1) {
              this.statusEnabled = true;
            } else {
              this.statusDisabled = true;
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

    const categoryData = this.categoryForm.value;
    const CategoryEncodedata = new FormData();
    CategoryEncodedata.append('parentId',categoryData.parentId);
    CategoryEncodedata.append('categoryName', categoryData.categoryName);
    CategoryEncodedata.append('from_time', categoryData.from_time);
    CategoryEncodedata.append('to_time', categoryData.to_time);
    CategoryEncodedata.append('status', categoryData.status);
    
   
    console.log(categoryData);
    if (this.categoryId) {
      this.editcategory(categoryData, this.categoryId);

      return false;
    }

    this.categoryService.categoryAdd(CategoryEncodedata).subscribe(
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
            this.router.navigateByUrl('/categoryList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editcategory(categoryEdit, id) {

    const categoryData = { categoryId: id, categoryName: categoryEdit.categoryName, status: categoryEdit.status,from_time:categoryEdit.from_time,to_time:categoryEdit.to_time};
    this.categoryService.categoryEdit(categoryData).subscribe(
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
            this.router.navigateByUrl('/categoryList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
