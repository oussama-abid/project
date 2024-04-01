import { AuthService } from "../login/auth.service"; 
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Import AuthService
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        return true; // Allow access
      } else {
        this.router.navigate(['/home']); // Redirect to login page
        return false; // Deny access
      }
    }
  }
  