import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  accessToken: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

     this.route.params.subscribe( params => this.accessToken = params.accessToken );

     sessionStorage.setItem('outletAccessToken', JSON.stringify(this.accessToken));

     this.router.navigateByUrl('/dashboard');


  }

}
