import { AuthService } from "../login/auth.service"; 
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Import AuthService
@Injectable({
    providedIn: 'root'
  })
  export class IslogedinGuard implements CanActivate {
  
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
        if (!this.authService.isLoggedIn()) {
          return true; // Allow access if not logged in
        } else {
          this.router.navigate(['dashboard']); // Redirect to home page if logged in
          return false; // Deny access
        }
      }
    }