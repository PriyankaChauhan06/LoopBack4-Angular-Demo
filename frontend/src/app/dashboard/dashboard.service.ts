import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

  getDashboardDetail() {
    return this.http.get(this.apiUrl + '/dashboard');
  }
}
