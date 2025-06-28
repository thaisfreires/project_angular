import { Component, Input } from '@angular/core';
import { Category, Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, ButtonComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  filteredProducts: Product[] = [];

  categories: Category[] = [];
  selectedFile?: File;


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
