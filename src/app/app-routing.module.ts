import { NgModule } from '@angular/core';
import { AuthService } from './login/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { IslogedinGuard } from './guards/islogedin.guard';


const routes: Routes = [
{ path:'home', component : IndexComponent,canActivate: [IslogedinGuard]},
{ path:'login', component : LoginComponent, canActivate: [IslogedinGuard]},
{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) , canActivate: [AuthGuard]},

//{ path:'dashboard', pathMatch :'prefix',canActivate: [AuthGuard]}
{ path:'',redirectTo: '/home', pathMatch :'prefix'},

{ path:'**', component : NotfoundComponent},
//redirect 
//{ path:'user/settings',redirectTo: 'register', pathMatch :'full'}  lien lezm ykoun nafsou
//{ path:'user/settings',redirectTo: 'register', pathMatch :'prefix'} ay lien yabda b (user/settings exp user/settings/dasch)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
