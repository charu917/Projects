import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(
    private backendService: BackendServiceService,
    private router: Router
  ) {}
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  OnSubmit() {
    console.log(this.signInForm.value);
    this.backendService.signIn(this.signInForm.value).subscribe({
      next: (response) => {
        console.log('Sign In successful!');
        this.signInForm.reset();
        localStorage.setItem('jwtToken', response.token);
        this.backendService.updateSignInStatus();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Sign-in failed:', err);
      },
    });
  }
}
