import { Component } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CommonModule],













  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = []

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: data => {
        console.log('Received:', data);
        this.products = data;
      },
      error: err => {
        console.error('HTTP Error:', err);
      }
    });
  }
}
