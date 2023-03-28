import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sale } from './sale.model';
import { Options } from '../models/options';

@Injectable({
  providedIn: 'root'
})
export class SaleService { constructor(private http: HttpClient) { }
apiUrl = environment.apiUrl

getSaleList() {
  return this.http.get(this.apiUrl + '/transactionItem')
}

createSale(sale: Sale) {
  return this.http.post(this.apiUrl + '/transactionItem', sale)
}

updateSale(id: number, sale: Sale) {
  return this.http.put(`${this.apiUrl}/transactionItem/${id}`, sale)
}

deleteSale(id: number) {
  return this.http.delete(`${this.apiUrl}/transactionItem/${id}`)
}
}
