import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FormControl } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { TradersComponent } from './traders/traders.component';
import { UsersComponent } from './users/users.component';
import { AddnewtraderComponent } from './addnewtrader/addnewtrader.component';
import { RegisterComponent } from './register/register.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EdittraderComponent } from './edittrader/edittrader.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    AddproductComponent,
    TradersComponent,
    UsersComponent,
    AddnewtraderComponent,
    RegisterComponent,
    ProductdetailsComponent,
    EditproductComponent,
    EdituserComponent,
    EdittraderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
