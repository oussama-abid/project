import { Component , ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dealer } from '../dealer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrl: './traders.component.css'
})
export class TradersComponent implements OnInit {
  
  dealers: Dealer[] = [];
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
    this.http.get('http://127.0.0.1:8000/api/dealers', { headers }).subscribe(
      (response: any) => {
        
        this.dealers = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
        console.log(this.dealers);
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

    const url = 'http://127.0.0.1:8000/api/dealers/' + this.productIdToDelete;
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
      
    this.router.navigate(['/dashboard/edittrader', productId]);    
  }

}

