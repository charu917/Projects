import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-custom',
  templateUrl: './navbar-custom.component.html',
  styleUrls: ['./navbar-custom.component.css'],
})
export class NavbarCustomComponent {
  constructor(
    private backendservice: BackendServiceService,
    private router: Router
  ) {}
  searchQuery: String = '';
  loggingOut() {
    this.backendservice.logout();
    this.router.navigate(['/']);
  }
  loadIndividual() {
    let text = this.searchQuery;
    text = text.trim();
    const data = {
      heading: text
        .replace(/[^\w\s-]/g, '')
        .toLowerCase()
        .split(' ')
        .join('-'),
    };
    this.backendservice.getIndividualData(data);
    this.searchQuery = '';
    this.router.navigate(['/individual-data'], { queryParams: data });
  }
}
