import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
@Component({
  selector: 'app-scholarships',
  templateUrl: './scholarships.component.html',
  styleUrls: ['./scholarships.component.css'],
})
export class ScholarshipsComponent implements OnInit {
  constructor(private backendservice: BackendServiceService) {}
  scholarships: [] = [];
  hide: boolean = true;
  // subscribe to the scholarships variable in the backend service
  ngOnInit(): void {
    this.backendservice.scholarships.subscribe({
      next: (data: any) => {
        this.scholarships = data;
        this.hide = false;
      },
    });
  }
}
