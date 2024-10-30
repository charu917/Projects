import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingMainComponent } from './landing-main/landing-main.component';
import { ScholarshipsComponent } from './scholarships/scholarships.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { IndividualScholarshipDetailsComponent } from './scholarships/individual-scholarship-details/individual-scholarship-details.component';
const routes: Routes = [
  { path: '', component: LandingMainComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'all-scholarships', component: ScholarshipsComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'individual-data', component: IndividualScholarshipDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
