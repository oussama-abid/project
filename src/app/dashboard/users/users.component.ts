import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];
  productIdToDelete: number | null;
  isDeleteConfirmed: boolean;
  constructor(private http: HttpClient,private router: Router,) {
    this.productIdToDelete = null;
    this.isDeleteConfirmed = false;
  }
  openConfirmationModal(productId: number) {
    this.productIdToDelete = productId;
    this.isDeleteConfirmed = false; // Reset the flag
  }

  ngOnInit(): void {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // Call logout method from AuthService
  
    // Subscribe to the logout HTTP request
    this.http.get('http://127.0.0.1:8000/api/users', { headers }).subscribe(
      (response: any) => {
        
        this.users = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
        console.log(this.users);
        // Reset current user
      
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  deleteProduct() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = 'http://127.0.0.1:8000/api/users/' + this.productIdToDelete;
    console.log(url);

    this.http.delete(url, { headers }).subscribe(
      (response: any) => {
        console.log(response);

        window.location.reload();
         // this.router.navigate(['/dashboard']);
       
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  edit(productId: number) {
      
    this.router.navigate(['/dashboard/edituser', productId]);    
  }

}
