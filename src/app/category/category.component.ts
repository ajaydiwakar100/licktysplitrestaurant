import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { CategoryList } from './category-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: CategoryList[];
  category: any;
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {

    this.categoryService.getOutletsCategoryList(this.page).subscribe(
      response => {

         this.categoryList = response;   
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.categoryService.getCategory(this.page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getCategory(page) {

    this.categoryService.getOutletsCategoryList(page).subscribe(
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
    localStorage.setItem('editcategory', categoryId);
    this.router.navigate(['/categoryAdd']);

  }

  addcategory() {
    localStorage.removeItem('editcategory');
    this.router.navigate(['/categoryAdd']);
  }

  deleteCategory(categoryId) {

    Swal({
      title: localisation.deleteTitle,
      text: localisation.deleteText,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: localisation.deleteConfirmButton
    }).then((result) => {
      if (result.value) {

        this.categoryService.deleteCategory(categoryId).subscribe(
          res => {

            this.categoryList = this.categoryList.filter(categoryList => categoryList.categoryId !== categoryId);

            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.deletedText,
                text: localisation.deletedMessage,
                type: 'success',
                showConfirmButton: false,
                timer: 1000
              });

              this.getCategory(this.page);
            } else {
              Swal({
                title: localisation.deletedErrorText,
                text: localisation.deletedErrorMessage,
                type: 'warning',
                showConfirmButton: false,
                timer: 1000
              });
            }

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      }
    });

  }

}
