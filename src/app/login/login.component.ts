import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; // Import AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://127.0.0.1:8000/api/login', body, { headers }).subscribe(
      (response: any) => {
        console.log(response);

        // Save user details and token to local storage
        this.authService.setSession(response.user, response.token);

        // Update currentUser in the NavbarComponent
        this.authService.authChanged.next();

        const currentUser = this.authService.getCurrentUser();
        const token = this.authService.getToken();

        if (currentUser && Object.keys(currentUser).length !== 0 && token) {
          console.log(token);
          console.log(currentUser.name);
          localStorage.setItem('status', 'login');
          localStorage.setItem('usertype',response.user.usertype);
          this.router.navigate(['/dashboard']);
          window.location.reload();
          // Redirect or perform any action upon successful login
        } else {
          console.error('Failed to store user details and token in local storage.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
