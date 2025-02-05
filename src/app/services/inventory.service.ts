import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  createProduct(product:any): Observable<any> {                            
    return this.http.post<any>(`${this.apiUrl}/products`, product);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`)
  }
}
