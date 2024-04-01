import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dealer } from '../dealer.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edittrader',
  templateUrl: './edittrader.component.html',
  styleUrl: './edittrader.component.css'
})
export class EdittraderComponent implements OnInit {
  productId: number | null = null; // Initialize productId as null
  dealers: Dealer[] = [];
  updateForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form in the constructor
    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      adress: ['', Validators.required],
     
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

      const url = 'http://127.0.0.1:8000/api/dealers/' + this.productId;
      this.http.get(url, { headers }).subscribe(
        (response: any) => {
          if (response && response.length > 0) {
            this.dealers = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
            const productData = this.dealers[0]; // Assuming you're fetching only one product
            this.updateForm.patchValue({
              email: this.dealers[0].email,
              name: this.dealers[0].name,
              phone: this.dealers[0].phone,
              adress: this.dealers[0].adress,
              
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
  
  }
  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      name:this.updateForm.value.name,
      email:this.updateForm.value.email,
      phone: this.updateForm.value.phone,
      adress: this.updateForm.value.adress,
      
    };
    
    const url = 'http://127.0.0.1:8000/api/dealers/' + this.productId;

    this.http.put(url, body, { headers }).subscribe(
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
