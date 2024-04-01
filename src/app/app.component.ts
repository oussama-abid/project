import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from './login/auth.service'; // Import AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'web';

  currentUser: any; // Variable to store current user
  currentSection: string = "";
  isEmptyObject:boolean=true;
  log: any;

  constructor(private authService: AuthService, private elementRef: ElementRef,private http: HttpClient,) {}



  ngOnInit(): void {
    // Retrieve current user details
    this.currentUser = this.authService.getCurrentUser();
    this.log = localStorage.getItem('status');
    console.log(this.currentUser);
    const isEmptyObject = Object.keys(this.currentUser).length === 0;

    // Subscribe to changes in authentication status
    this.authService.authChanged.subscribe(() => {
      this.currentUser = this.authService.getCurrentUser();
      this.isEmptyObject = Object.keys(this.currentUser).length === 0;
    });
}
}
