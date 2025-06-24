import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-category-form',
  imports: [],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
    form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private productService: ProductService) {}

  createCategory() {
    if (this.form.valid) {
      this.productService.createCategory({ name: this.form.get('name')?.value ?? '' }).subscribe({
        next: (category) => {
          alert(`Category "${category.name}" created!`);
          this.form.reset();
        },
        error: () => alert('Failed to create category'),
      });
    }
  }
  loadCategories() {
    return this.productService.getCategories().subscribe({
      next: (categories) => {
      },
      error: () => {
        alert('Failed to load categories');
      },
    });
  }
}

