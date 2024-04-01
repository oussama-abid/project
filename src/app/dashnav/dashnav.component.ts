import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../login/auth.service'; // Import AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashnav',
  templateUrl: './dashnav.component.html',
  styleUrl: './dashnav.component.css'
})
export class DashnavComponent implements OnInit {
  currentUser: any; // Variable to store current user
  currentSection: string = "";
  userType: string;
  constructor(private authService: AuthService, private router: Router,private elementRef: ElementRef,private http: HttpClient,) {
    this.userType = localStorage.getItem('usertype') || '';
  }

  ngOnInit(): void {
    // Retrieve current user details
    this.currentUser = this.authService.getCurrentUser();

    // Subscribe to changes in authentication status
    this.authService.authChanged.subscribe(() => {
      this.currentUser = this.authService.getCurrentUser();
    });
  }
  logout(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // Call logout method from AuthService
    this.authService.logout();
  
    // Subscribe to the logout HTTP request
    this.http.post('http://127.0.0.1:8000/api/logout', { headers }).subscribe(
      (response: any) => {
        console.log(response);
        // Reset current user
        this.currentUser = null;
        localStorage.setItem('status', 'nologin');
        localStorage.setItem('usertype', 'notadmin');
        this.router.navigate(['home']);
        window.location.reload();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  
}

