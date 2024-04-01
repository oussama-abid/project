import { Component ,OnInit,NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AOS from 'aos';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  showContactMessage: boolean = false;
  constructor(private http: HttpClient,private ngZone: NgZone) {}
  ngOnInit() {
    AOS.init();
    setInterval(() => {
      this.ngZone.run(() => {
        this.showContactMessage = true;
        setTimeout(() => {
          this.showContactMessage = false;
        }, 3000); // Adjust duration as needed (in milliseconds)
      });
    }, 10000);
  }
  showAlert: boolean = false;
  searchResult: any;
  deliveryNumber: string = '';
  errorMessage: string = '';
  

  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      delivery_number: this.deliveryNumber
    };

    this.http.post('http://127.0.0.1:8000/api/search', body, { headers }).subscribe(
      (response: any) => {
        console.log(response); 

        
    this.searchResult = response;
    this.showAlert = true; 
    this.errorMessage = '';
      },
      (error) => {
        this.searchResult = '';
        console.error('Error:', error);
        this.errorMessage = 'لا توجد شحنة بهذا الرقم '; // Set the error message
  this.showAlert = true;
      }
    );
  }

  hideAlert(event: Event) {
    event.preventDefault();
    this.showAlert = false; // Hide the alert when the close button is clicked
  }

  
}


  
  