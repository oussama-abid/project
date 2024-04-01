import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../login/auth.service"; 

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {}
  
    canActivate(): boolean {
      const userType = localStorage.getItem('usertype');
      if (userType === 'admin') {
        return true;
      } else {
        // Redirect to some other route or show an error message
        this.router.navigate(['/home']);
        return false;
      }
    }
  }