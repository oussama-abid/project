import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dealer } from '../dealer.interface';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  productId: number | null = null; // Initialize productId as null
  products: Product[] = [];
  updateForm: FormGroup;
   dealers: Dealer[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form in the constructor
    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
      trader: ['', Validators.required],
      receivingDate: ['', Validators.required],
      shipmentDepartureDate: ['', Validators.required],
      shipmentLocation: ['', Validators.required],
      paidAmount: ['', Validators.required],
      remainingAmount: ['', Validators.required],
      deliveryAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Retrieve productId from route parameters and parse it to a number
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.productId = parseInt(idParam, 10);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const url = 'http://127.0.0.1:8000/api/products/' + this.productId;
      this.http.get(url, { headers }).subscribe(
        (response: any) => {
          if (response && response.length > 0) {
            this.products = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
            const productData = this.products[0]; // Assuming you're fetching only one product
            this.updateForm.patchValue({
              email: this.products[0].dealer.name,
              password: productData.Quantity,
              type: this.products[0].Type,
              trader: this.products[0].Recipient,
              receivingDate: this.products[0].ReceivingDate,
              shipmentDepartureDate: this.products[0].ShipmentDepartureDate,
              shipmentLocation: this.products[0].Shipmentlocation,
              paidAmount: this.products[0].paidamount,
              remainingAmount: this.products[0].remainingaamount,
              deliveryAddress: this.products[0].Deliveryaddress
            });
          } else {
            console.error('No product data received from the API.');
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      // Handle the case where idParam is null, maybe redirect to an error page or handle it differently
      console.error("Product ID parameter is null");
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
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
      dealer_name:this.updateForm.value.email,
      Quantity:this.updateForm.value.password,
      Type: this.updateForm.value.type,
      Recipient: this.updateForm.value.trader,
      ReceivingDate: this.updateForm.value.receivingDate,
      ShipmentDepartureDate: this.updateForm.value.shipmentDepartureDate,
      Shipmentlocation: this.updateForm.value.shipmentLocation,
      paidamount: this.updateForm.value.paidAmount,
      remainingaamount: this.updateForm.value.remainingAmount,
      Deliveryaddress: this.updateForm.value.deliveryAddress
    };
    
    const url = 'http://127.0.0.1:8000/api/products/' + this.productId;

    this.http.put(url, body, { headers }).subscribe(
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
