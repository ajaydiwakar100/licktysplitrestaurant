import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  widgetList: any;
  totalOrders: Number;
  totalIncome: any;
  rejectedOrders: Number;
  dishes: Number;
  balance: any;
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {

    this.dashboardService.getWidgets().subscribe(
      response => {

        const widgetList = response.body['widegets'];
        this.totalOrders = widgetList.totalOrders;
        this.totalIncome = widgetList.totalIncome;
        this.balance = widgetList.balanceIncome;
        this.rejectedOrders = widgetList.rejectedOrders;
        this.dishes = widgetList.dishes;


      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
