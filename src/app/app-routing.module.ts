import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CustomisationComponent } from './customisation/customisation.component';
import { CustomisationAddComponent } from './customisation/customisation-add/customisation-add.component';
import { DishComponent } from './dish/dish.component';
import { DishAddComponent } from './dish/dish-add/dish-add.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from './auth.guard';
import { OrderViewComponent } from './order/order-view/order-view.component';
import { ProfileComponent } from './profile/profile.component';
import { CouponComponent } from './coupon/coupon.component';
import { AddCouponeComponent } from './coupon/add-coupone/add-coupone.component';
import { ReportsComponent } from './reports/reports.component';
import { ChangepasswordComponent1 } from '../app/layout/changepassword/changepassword.component';
const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },

  {
    path: 'adminOutletLogin/:accessToken',
    component: AdminLoginComponent
  },

  {
    path: 'serverError',
    component: ServerErrorComponent
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'categoryList', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'categoryAdd', component: CategoryAddComponent, canActivate: [AuthGuard] },
      { path: 'categoryEdit/:id', component: CategoryAddComponent, canActivate: [AuthGuard] },
      { path: 'customisationList', component: CustomisationComponent, canActivate: [AuthGuard] },
      { path: 'customisationAdd', component: CustomisationAddComponent, canActivate: [AuthGuard] },
      { path: 'customisationEdit/:id', component: CustomisationAddComponent, canActivate: [AuthGuard] },
      { path: 'dishList', component: DishComponent, canActivate: [AuthGuard] },
      { path: 'dishAdd', component: DishAddComponent, canActivate: [AuthGuard] },
      { path: 'dishEdit/:id', component: DishAddComponent, canActivate: [AuthGuard] },
      { path: 'orderList', component: OrderComponent, canActivate: [AuthGuard] },
      { path: 'orderView/:id', component: OrderViewComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'couponList', component: CouponComponent, canActivate: [AuthGuard] },
      { path: 'addCoupone', component: AddCouponeComponent, canActivate: [AuthGuard] },
     { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
     { path: 'changepass', component: ChangepasswordComponent1, canActivate: [AuthGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
