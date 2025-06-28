import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from './product.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = "http://localhost:8080/products";

  constructor(private http: HttpClient) { } 

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  create(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/create`, formData);
  }
  update(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, formData);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/categories');
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8080/categories', category);
  }

}
