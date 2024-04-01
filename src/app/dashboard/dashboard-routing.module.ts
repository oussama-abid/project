import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { TradersComponent } from './traders/traders.component';
import { UsersComponent } from './users/users.component';
import { AddnewtraderComponent } from './addnewtrader/addnewtrader.component';
import { RegisterComponent } from './register/register.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { EdittraderComponent } from './edittrader/edittrader.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AdminGuard } from '../guards/isadmin.guard';
const routes: Routes = [
  
  { path: '', component: DashboardComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'productdetails/:id', component: ProductdetailsComponent },
  { path: 'editproduct/:id', component: EditproductComponent },
  { path: 'edituser/:id', component: EdituserComponent,canActivate: [AdminGuard] },
  { path: 'edittrader/:id', component: EdittraderComponent },

  { path: 'register', component: RegisterComponent,canActivate: [AdminGuard] },
  { path: 'addptrader', component: AddnewtraderComponent },
  { path: 'traders', component: TradersComponent },
  { path: 'users', component: UsersComponent,canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
