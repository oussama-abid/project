import { Component , ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../login/auth.service'; // Import AuthService
import { Router } from '@angular/router';
import { Dealer } from '../dealer.interface';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  dealer_name:string= '';
  Quantity: string= '';
  Type: string= '';
  Trader: string= '';
  ReceivingDate: string= '';
  ShipmentDepartureDate: string= '';
  Shipmentlocation: string= '';
  paidamount: string= '';
  remainingaamount: string= '';
  Deliveryaddress: string= '';
  dealers: Dealer[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}
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
  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      dealer_name:this.dealer_name,
      Quantity:this.Quantity,
      Type: this.Type,
      Recipient:this.Trader,
      ReceivingDate:this.ReceivingDate,
      ShipmentDepartureDate:this.ShipmentDepartureDate,
      Shipmentlocation:this.Shipmentlocation,
      paidamount:this.paidamount,
      remainingaamount:this.remainingaamount,
      Deliveryaddress:this.Deliveryaddress,
    };

    this.http.post('http://127.0.0.1:8000/api/addproduct', body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        
        this.router.navigate(['/dashboard']);
 
         // this.router.navigate(['/dashboard']);
       
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
