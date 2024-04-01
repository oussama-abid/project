import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../login/auth.service'; // Import AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any; // Variable to store current user
  currentSection: string = "";

  constructor(private authService: AuthService, private router: Router,private elementRef: ElementRef,private http: HttpClient,) {}

  ngOnInit(): void {
    // Retrieve current user details
    this.currentUser = this.authService.getCurrentUser();

    // Subscribe to changes in authentication status
    this.authService.authChanged.subscribe(() => {
      this.currentUser = this.authService.getCurrentUser();
    });

    // Subscribe to window scroll events
    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.onScroll());
  }

  scrollTo(section: string): void {
    const sectionElement = this.elementRef.nativeElement.ownerDocument.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = section; // Set current section
      this.addClickedStyle(section); // Add clicked style
    }
  }

  addClickedStyle(section: string): void {
    const linkElement = this.elementRef.nativeElement.ownerDocument.querySelector(`[data-section="${section}"]`);
    if (linkElement) {
      linkElement.classList.add('active');
    }
  }

  removeClickedStyle(section: string): void {
    const linkElement = this.elementRef.nativeElement.ownerDocument.querySelector(`[data-section="${section}"]`);
    if (linkElement) {
      linkElement.classList.remove('active');
    }
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
        this.router.navigate(['']);
        window.location.reload();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onScroll(): void {
    // Check if user has scrolled away from the current section
    const sections = ['we', 'services', 'shipment', 'contact','home']; // Add IDs of all sections
    for (const section of sections) {
      const sectionElement = this.elementRef.nativeElement.ownerDocument.getElementById(section);
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          // Section is currently in view
          this.currentSection = section;
          this.addClickedStyle(section); // Add clicked style
        } else {
          // Section is not in view
          this.removeClickedStyle(section); // Remove clicked style
        }
      }
    }
  }
}
