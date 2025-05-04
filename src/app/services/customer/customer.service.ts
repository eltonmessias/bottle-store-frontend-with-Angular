import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/Customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  constructor(private http:HttpClient) { }

  private apiUrl = "http://localhost:8080/api/v1/bigbrother/customer";

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
