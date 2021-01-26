import { Component, OnInit } from '@angular/core';
import { LayoutService} from '../layout.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent1 implements OnInit {
  password: any;
  repassword:any;
  constructor(private router: Router,
    private LayoutService: LayoutService) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.password);
    console.log(this.repassword);
    if(this.password == this.repassword){
if(this.password != null && this.repassword != null){


    
    const changeStatus = { password: this.password }
  this.LayoutService.password(changeStatus).subscribe(
    response => {
      if (response.body['error'] === 'false') {
        Swal({
          title: 'Success',
          text:   'Password Changed Updated',
          type: 'success',
          confirmButtonText: 'Ok',
        });
   
      }
      else{
        Swal({
          title: 'Error',
          text:   response.body['errorMessage'],
          type: 'warning',
          confirmButtonText: 'Ok',
        });
      }
    });
  }
  else{
    Swal({
      title: 'Error',
      text:   'Password Should not be Empty',
      type: 'warning',
      confirmButtonText: 'Ok',
    });
  }
  }
  else{
    Swal({
      title: 'Error',
      text:   'Password Does not Match',
      type: 'warning',
      confirmButtonText: 'Ok',
    });
  }
  }
}
