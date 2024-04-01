import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product.interface';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {
  productId: number | null = null; // Initialize productId as null
  products: Product[] = [];

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

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
          this.products = response.reduce((acc: any[], curr: any[]) => acc.concat(curr), []);
        console.log(this.products);
  
          
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

  pdf(productId: number){
    const url = 'http://127.0.0.1:8000/api/productdetails/' + productId;

    this.http.get(url, { responseType: 'blob' as 'json' }).subscribe(
      (response: any) => { // Change response type to 'any'
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = fileURL;
        a.download = 'تفاصيل_الطلبية.pdf';
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
