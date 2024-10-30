import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  constructor(private http: HttpClient) {}
  signed_in: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  scholarships: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  scholarship: BehaviorSubject<any> = new BehaviorSubject<any>('');
  url_template = 'http://localhost:3000/';
  popular: BehaviorSubject<any> = new BehaviorSubject<any>('');
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  signUp(data: any): Observable<any> {
    return this.http.post(this.url_template + 'sign-up', JSON.stringify(data), {
      headers: this.headers,
    });
  }

  signIn(data: any): Observable<any> {
    return this.http.post(this.url_template + 'sign-in', JSON.stringify(data), {
      headers: this.headers,
    });
  }

  getUserData(): Observable<any> {
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Jwt token not found!');
    }
    const header_token = new HttpHeaders({
      Authorization: 'Bearer ' + token, //bearer token(access token) in the authorization header
    });
    return this.http.post(
      this.url_template + 'user-info',
      {},
      {
        headers: header_token,
      }
    );
  }
  updateSignInStatus(): void {
    let token = localStorage.getItem('jwtToken');
    if (token) this.signed_in.next(true);
    else this.signed_in.next(false);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.updateSignInStatus();
  }

  update_profile(data: any): Observable<any> {
    //send this data to backend and update profile
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Jwt token not found!');
    }
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post(
      this.url_template + 'update_user-info',
      JSON.stringify(data),
      { headers: headers }
    );
  }

  getScholarshipData(data: any): Observable<any> {
    return this.http.post(
      this.url_template + 'all-scholarships',
      JSON.stringify(data),
      { headers: this.headers }
    );
  }
  updateScholarshipData(data: any) {
    this.scholarships.next(data);
  }

  getIndividualData(data: any) {
    this.http
      .post(
        this.url_template + 'individual-scholarship',
        JSON.stringify(data),
        { headers: this.headers }
      )
      .subscribe({
        next: (response) => {
          this.scholarship.next(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  findscholarshipUser(data: any): Observable<any> {
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Jwt token not found!');
    }
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post(
      this.url_template + 'find-status',
      JSON.stringify(data),
      { headers: headers }
    );
  }

  changestatus(title: any, status: any) {
    let data = { title: title, status: status };
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Jwt token not found!');
    }
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    this.http
      .post(this.url_template + 'change_status', JSON.stringify(data), {
        headers: headers,
      })
      .subscribe({
        next: () => {},
        error: (err) => {
          console.log(err);
        },
      });
  }
  getPopularScholarships(): any {
    this.http.get('http://localhost:3000/getPopular').subscribe({
      next: (response) => {
        this.popular.next(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
