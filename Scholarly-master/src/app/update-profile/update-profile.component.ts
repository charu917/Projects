import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  constructor(
    private backendservice: BackendServiceService,
    private router: Router
  ) {}
  user_data: any;
  percentageValidator() {
    return (control: FormControl) => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }
      return value >= 0 && value <= 100 ? null : { invalidPercentage: true };
    };
  }
  updateform = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    percentage10th: new FormControl('', [this.percentageValidator]),
    percentage12th: new FormControl('', [this.percentageValidator]),
    ugDegree: new FormControl(''),
    percentageUg: new FormControl('', [this.percentageValidator]),
    intendedDegree: new FormControl(''),
  });

  ngOnInit(): void {
    this.backendservice.getUserData().subscribe({
      next: (response) => {
        this.user_data = response.data;
        // patch value function from form group class: uppdates form controls
        this.updateform.patchValue({
          firstName: this.user_data.name.first,
          lastName: this.user_data.name.last,
          email: this.user_data.email,
          password: this.user_data.password,
          percentage10th: this.user_data.percentage10th || '',
          percentage12th: this.user_data.percentage12th || '',
          percentageUg: this.user_data.percentageUg || '',
          ugDegree: this.user_data.ugDegree,
          intendedDegree: this.user_data.intendedDegree,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update_data() {
    this.backendservice.update_profile(this.updateform.value).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('Some error occured!' + error);
      },
    });
  }
}
