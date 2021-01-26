import { Component, OnInit } from '@angular/core';
import { DishService } from './dish.service';
import { DishList } from './dish-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dishList: DishList[];
  excelResult: any = [];
 
  dish: any;
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;
  unAuth: String = 'Unauthenticated.';
  fileToUpload: File = null;
  restaurantId :any;
  constructor(
    private dishService: DishService,
    private router: Router
  ) { }

  ngOnInit() {

    this.dishService.getOutletsDishList(this.page).subscribe (
      response => {
        this.dishList = response;
       
       // console.log(response['list']);
        
      
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.dishService.getDish(this.page).subscribe(
      response => {
      
        this.pages = response.body['totalPage'] * 10;
      
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.restaurantId = sessionStorage.getItem('outletid'); 

    this.dishService.getdishreport(this.restaurantId).subscribe(
      response => {

        console.log(response.body['dishes']);
        this.excelResult = [];

      //  this.pages = response.body['totalPage'] * 10;
        const totalData = response.body['dishes'];
        console.log(totalData);
        totalData.map((x, i) => {
          const sampData: { [key: string]: any } = {};
          sampData.Id = x.id;
          sampData.Name = x.name;
          sampData.image = x.image;
          sampData.isVeg = x.isVeg;
          sampData.price = x.price;
          sampData.quantity = x.quantity;
          this.excelResult.push(sampData);

        });  

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getdish(page) {

    this.dishService.getOutletsDishList(page).subscribe(
      response => {

        this.dishList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editdish(dishId) {

    localStorage.removeItem('editdish');
    localStorage.setItem('editdish', dishId.toString());
    this.router.navigate(['/dishAdd']);

  }

  adddish() {
    localStorage.removeItem('editdish');
    this.router.navigate(['/dishAdd']);
  }


  exportAsXLSX(): void {
    if (this.excelResult.length === 0) {
      Swal({
        title: 'Error',
        text: 'Orders Data has empty',
        type: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      this.dishService.exportAsExcelFile(this.excelResult, 'reports');
    }
  }
  deleteDish(dishId) {

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

        this.dishService.deleteDish(dishId).subscribe(
          res => {

            this.dishList = this.dishList.filter(dishList => dishList.id !== dishId);

            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.deletedText,
                text: localisation.deletedMessage,
                type: 'success',
                showConfirmButton: false,
                timer: 1000
              });

              this.getdish(this.page);
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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileName = this.fileToUpload.name;


    // let payload = {
    // this.fileToUpload,
    // }
    
    let formData: FormData = new FormData();
    formData.append('import_file',this.fileToUpload,this.fileToUpload.name);
    //var file = {import_file: this.fileToUpload.name}
    this.dishService.bulkupload(formData).subscribe(
      res => {
        if (res.body['error'] == 200) {
          Swal({
            title: 'Success',
            text: res.body['errorMessage'],
            type: 'success',
            showConfirmButton: false,
            timer: 1000
          });
          this.getdish(this.page);
         
        }
        else {
          Swal({
            title: "Oops",
            text: res.body['errorMessage'],
            type: 'warning',
            showConfirmButton: true,
            
          });
         
        }

      });
    }
}
