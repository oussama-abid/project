import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChanged = new Subject<void>(); // Observable for authentication changes

  constructor() {}

  // Set user session in local storage
  setSession(user: any, token: string) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('status', 'login');
    // Notify subscribers (components) that authentication status has changed
    this.authChanged.next();
  }

  // Get current user from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // Get authentication token from local storage
  getToken() {
    return localStorage.getItem('token') || '';
  }

  // Clear user session (logout)
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.setItem('status', 'nologin');
    // Notify subscribers (components) that authentication status has changed
    this.authChanged.next();
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  }

  // Observable for authentication changes
  getAuthChanged() {
    return this.authChanged.asObservable();
  }
}
