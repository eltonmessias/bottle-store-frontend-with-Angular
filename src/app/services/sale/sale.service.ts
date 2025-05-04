import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { Sale } from '../../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = 'http://localhost:8080/api/v1/bigbrother/sales';
  constructor(private http: HttpClient) { }

  processSale(saleData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, saleData);
  }

  getLatestSales(count: number): Observable<Sale[]> {
    const url = `${this.apiUrl}/latest?count=${count}`;
  console.log('URL chamada:', url);
  return this.http.get<Sale[]>(url);
  }
}
