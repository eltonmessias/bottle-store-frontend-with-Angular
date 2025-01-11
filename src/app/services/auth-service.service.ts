import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = 'http://localhost:8080/auth/login'

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: {username: string; password:string}): Observable<any> {
    return this.http.post(`${this.url}`, credentials)
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    return !!token
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
