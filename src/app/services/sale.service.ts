import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = 'http://localhost:8080/bigbrother/api/sales';
  constructor(private http: HttpClient) { }

  processSale(saleData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, saleData);
  }
}
