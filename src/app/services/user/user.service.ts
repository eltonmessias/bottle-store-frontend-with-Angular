import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/v1/bigbrother/users';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)

  }
}
