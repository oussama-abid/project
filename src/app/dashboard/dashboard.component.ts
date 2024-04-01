import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  products: Product[] = [];
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
    this.http.get('http://127.0.0.1:8000/api/products', { headers }).subscribe(
      (response: any) => {
        
        this.products = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
        console.log(this.products);
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
  
      const url = 'http://127.0.0.1:8000/api/products/' + this.productIdToDelete;
      console.log(url);
  
      this.http.delete(url, { headers }).subscribe(
        (response: any) => {
          console.log(response);
          window.location.reload();       
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    
  }
  
  show(productId: number) {
      
    this.router.navigate(['/dashboard/productdetails', productId]);    
  }
  edit(productId: number) {
      
    this.router.navigate(['/dashboard/editproduct', productId]);    
  }

}
