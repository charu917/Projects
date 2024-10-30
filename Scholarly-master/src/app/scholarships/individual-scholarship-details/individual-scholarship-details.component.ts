import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService } from 'src/app/backend-service.service';
@Component({
  selector: 'app-individual-scholarship-details',
  templateUrl: './individual-scholarship-details.component.html',
  styleUrls: ['./individual-scholarship-details.component.css'],
})
export class IndividualScholarshipDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private backendservice: BackendServiceService,
    private router: Router
  ) {}
  heading = '';
  scholarshipData = {
    heading: '',
    description: '',
    markers: '',
    link: '',
    status: '',
    imgUrl: '',
    overview: [],
  };
  applied = false;
  saved = false;
  statusApplied = 'Not Applied';
  SaveStatus = 'Not Saved';
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.heading = params['heading'];
      },
    });
    this.backendservice.scholarship.subscribe({
      next: (data) => {
        this.scholarshipData = data;
      },
    });
    this.backendservice
      .findscholarshipUser({
        heading: this.heading,
      })
      .subscribe({
        next: (response: { status: { applied: Boolean; saved: Boolean } }) => {
          if (response.status.applied == true) {
            this.applied = true;
            this.statusApplied = 'Applied';
          }
          if (response.status.saved == true) {
            this.saved = true;
            this.SaveStatus = 'Saved';
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  backtoScholarships() {
    this.router.navigate(['/all-scholarships']);
  }
  updateStatus(title: any) {
    this.applied = !this.applied;
    if (this.statusApplied == 'Not Applied') this.statusApplied = 'Applied';
    else this.statusApplied = 'Not Applied';
    this.backendservice.changestatus(title, {
      applied: this.applied,
      saved: this.saved,
    });
  }
  updateSaveStatus(title: any) {
    this.saved = !this.saved;
    if (this.SaveStatus == 'Not Saved') this.SaveStatus = 'Saved';
    else this.SaveStatus = 'Not Saved';
    this.backendservice.changestatus(title, {
      applied: this.applied,
      saved: this.saved,
    });
  }
}
