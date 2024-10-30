import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private backendservice: BackendServiceService) {}
  title = 'scholarly';
  url = 'https://scholarshipforme.com/scholarships?';
  scholarships = [];
  signed_in = false;
  ngOnInit(): void {
    this.backendservice.updateSignInStatus();
    this.backendservice.signed_in.subscribe({
      next: (isSignedIn: boolean) => {
        this.signed_in = isSignedIn;
      },
    });
    this.backendservice.getScholarshipData({ url: this.url }).subscribe({
      next: (response) => {
        this.scholarships = response;
        console.log(this.scholarships);
        this.backendservice.updateScholarshipData(this.scholarships);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.backendservice.getPopularScholarships();
  }
}
