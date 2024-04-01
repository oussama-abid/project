import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit {
  productId: number | null = null; // Initialize productId as null
  users: User[] = [];
  updateForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form in the constructor
    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      usertype:['', Validators.required],
     
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

      const url = 'http://127.0.0.1:8000/api/users/' + this.productId;
      this.http.get(url, { headers }).subscribe(
        (response: any) => {
          if (response && response.length > 0) {
            this.users = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
            const productData = this.users[0]; // Assuming you're fetching only one product
            this.updateForm.patchValue({
              email: this.users[0].email,
              name: this.users[0].name,
              type: this.users[0].usertype,
              
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
      usertype: this.updateForm.value.type,
      
    };
    
    const url = 'http://127.0.0.1:8000/api/users/' + this.productId;

    this.http.put(url, body, { headers }).subscribe(
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
