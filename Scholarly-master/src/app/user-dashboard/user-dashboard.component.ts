import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private backendService: BackendServiceService) {}
  count_applied: any;
  count_saved: any;
  count_both: any;
  user_data: any;
  ngOnInit(): void {
    this.backendService.getUserData().subscribe({
      next: (response) => {
        this.user_data = response.data;
        this.count_applied = 0;
        this.count_saved = 0;
        this.count_both = 0;
        this.user_data.Scholarships.forEach((scholarship: any) => {
          if (
            scholarship.status.applied == true &&
            scholarship.status.saved == false
          )
            this.count_applied += 1;
          if (
            scholarship.status.saved == true &&
            scholarship.status.applied == false
          )
            this.count_saved += 1;
          if (
            scholarship.status.saved == true &&
            scholarship.status.applied == true
          )
            this.count_both += 1;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
