import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(
    private BackendService: BackendServiceService,
    private router: Router
  ) {}
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    percentage10th: new FormControl(''),
    percentage12th: new FormControl(''),
    ugDegree: new FormControl(''),
    percentageUg: new FormControl(''),
    intendedDegree: new FormControl(''),
  });
  onSubmit() {
    this.BackendService.signUp(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful');
        this.signUpForm.reset();
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
      },
    });
  }
}
