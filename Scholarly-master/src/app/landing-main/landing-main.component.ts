import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-landing-main',
  templateUrl: './landing-main.component.html',
  styleUrls: ['./landing-main.component.css'],
})
export class LandingMainComponent implements OnInit {
  constructor(private backendservice: BackendServiceService) {}
  popular: any = '';
  ngOnInit(): void {
    this.backendservice.popular.subscribe({
      next: (response) => {
        this.popular = response;
      },
    });
  }
}
