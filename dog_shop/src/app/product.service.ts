import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = 'https://localhost:8181/products';

  constructor(private http: HttpClient) { } 

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
    console.log('Retrieved products from API');
  }

}
