import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from 'src/app/backend-service.service';
@Component({
  selector: 'app-scholarship-detail-card',
  templateUrl: './scholarship-detail-card.component.html',
  styleUrls: ['./scholarship-detail-card.component.css'],
})
export class ScholarshipDetailCardComponent {
  constructor(
    private router: Router,
    private backendservice: BackendServiceService
  ) {}
  @Input() scholarshipData = {
    heading: '',
    content: '',
    links: '',
    img_url: '',
  };
  open_data(heading: string) {
    heading = heading.trim();
    const data = {
      heading: heading
        .replace(/[^\w\s-]/g, '')
        .toLowerCase()
        .split(' ')
        .join('-'),
    };
    this.backendservice.getIndividualData(data);
    this.router.navigate(['/individual-data'], { queryParams: data });
  }
}
