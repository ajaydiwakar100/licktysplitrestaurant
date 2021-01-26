import { Component, OnInit } from '@angular/core';
import { CustomisationService } from './customisation.service';
import { CustomisationList } from './customisation-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-customisation',
  templateUrl: './customisation.component.html',
  styleUrls: ['./customisation.component.css']
})
export class CustomisationComponent implements OnInit {

  customisationList: CustomisationList[];
  customisation: any;
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;

  constructor(
    private customisationService: CustomisationService,
    private router: Router
  ) { }

  ngOnInit() {

    this.customisationService.getOutletsCustomisationList(this.page).subscribe(
      response => {

         this.customisationList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.customisationService.getCustomisation(this.page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getcustomisation(page) {

    this.customisationService.getOutletsCustomisationList(page).subscribe(
      response => {

        this.customisationList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editcustomisation(customisationId) {

    localStorage.removeItem('editcustomisation');
    localStorage.setItem('editcustomisation', customisationId.toString());
    this.router.navigate(['/customisationAdd']);

  }

  addcustomisation() {
    localStorage.removeItem('editcustomisation');
    this.router.navigate(['/customisationAdd']);
  }

  deleteCustomisation(customisationId) {

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

        this.customisationService.deleteCustomisation(customisationId).subscribe(
          res => {

            this.customisationList = this.customisationList.filter(customisationList => customisationList.id !== customisationId);

            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.deletedText,
                text: localisation.deletedMessage,
                type: 'success',
                showConfirmButton: false,
                timer: 1000
              });

              this.getcustomisation(this.page);
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
