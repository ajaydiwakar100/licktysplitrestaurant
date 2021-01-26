import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CustomisationComponent } from './customisation/customisation.component';
import { CustomisationAddComponent } from './customisation/customisation-add/customisation-add.component';
import { DishComponent } from './dish/dish.component';
import { DishAddComponent } from './dish/dish-add/dish-add.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorComponent } from './server-error/server-error.component';
import { OrderComponent } from './order/order.component';
import { OrderViewComponent } from './order/order-view/order-view.component';
import { DateTimeFormatPipe } from './shared/date.pipe';
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { WidgetComponent } from './dashboard/widget/widget.component';
import { environment } from './../environments/environment';
import { ChartComponent } from './dashboard/chart/chart.component';
import { CouponComponent } from './coupon/coupon.component';
import { AddCouponeComponent } from './coupon/add-coupone/add-coupone.component';
import { ReportsComponent } from './reports/reports.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ChangepasswordComponent1 } from '../app/layout/changepassword/changepassword.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ChangePasswordComponent,
    AdminLoginComponent,
    CategoryComponent,
    CategoryAddComponent,
    CustomisationComponent,
    CustomisationAddComponent,
    DishComponent,
    DishAddComponent,
    LocalisationComponent,
    ServerErrorComponent,
    OrderComponent,
    OrderViewComponent,
    DateTimeFormatPipe,
    ProfileComponent,
    WidgetComponent,
    ChartComponent,
    CouponComponent,
    AddCouponeComponent,
    ReportsComponent,
    ChangepasswordComponent1
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgProgressHttpModule,
    AngularMultiSelectModule,
    NgProgressRouterModule,
    LoadingBarHttpClientModule,
    NgProgressModule,
    NgxMaterialTimepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey
    })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
