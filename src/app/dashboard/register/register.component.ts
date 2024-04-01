import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../login/auth.service'; // Import AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  name:string= '';
  email: string= '';
  password: string= '';
  password_confirmation: string= '';
  usertype: string='';
  
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
      name:this.name,
     
      email: this.email,
      password:this.password,
      usertype:this.usertype,
      password_confirmation:this.password_confirmation,
      
    };

    this.http.post('http://127.0.0.1:8000/api/register', body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/dashboard/users']);
 
         // this.router.navigate(['/dashboard']);
       
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}

