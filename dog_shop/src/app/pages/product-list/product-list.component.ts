import { Component } from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  filteredProducts: Product[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.filteredProducts = this.products;
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
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category.name === this.selectedCategory;
      return matchesName && matchesCategory;
    });
  }
}
