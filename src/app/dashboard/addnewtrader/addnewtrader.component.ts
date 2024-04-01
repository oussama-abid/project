import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../login/auth.service'; // Import AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-addnewtrader',
  templateUrl: './addnewtrader.component.html',
  styleUrl: './addnewtrader.component.css'
})
export class AddnewtraderComponent {
  name:string= '';
  phone: string= '';
  email: string= '';
  adress:string='';
  
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
      phone:this.phone,
      email: this.email,
      adress:this.adress
      
    };

    this.http.post('http://127.0.0.1:8000/api/adddealer', body, { headers }).subscribe(
      (response: any) => {
        console.log(response);

        this.router.navigate(['/dashboard/traders']);
         // this.router.navigate(['/dashboard']);
       
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
