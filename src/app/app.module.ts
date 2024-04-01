import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { DashnavComponent } from './dashnav/dashnav.component';
import { AddproductComponent } from './dashboard/addproduct/addproduct.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import * as AOS from 'aos';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    IndexComponent,
    DashnavComponent,
    SidebarComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
