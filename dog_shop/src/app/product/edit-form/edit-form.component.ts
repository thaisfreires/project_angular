import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-edit-form',
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent {
  @Input() selectedProduct!: Product;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    image: new FormControl(null),
  });

  categories: Category[] = [];
  selectedFile?: File;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();

    if (this.selectedProduct) {
      this.form.patchValue({
        name: this.selectedProduct.name,
        description: this.selectedProduct.description,
        price: this.selectedProduct.price,
        category: this.selectedProduct.category?.id,
      });
    }
  }

  loadCategories() {
    this.productService.getCategories().subscribe((cats) => (this.categories = cats));
  }

  onFileChange(event: any) {
    if (event.target.files?.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  updateProduct() {
    if (!this.selectedProduct?.id) {
      alert('No product selected for editing.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value ?? '');
    formData.append('description', this.form.get('description')?.value ?? '');
    formData.append('price', this.form.get('price')?.value?.toString() ?? '');
    formData.append('category', this.form.get('category')?.value?.toString() ?? '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.update(this.selectedProduct.id, formData).subscribe(() => {
      alert('Product updated successfully!');
      this.form.reset();
    });
  }
  deleteProduct() {
    if (!this.selectedProduct?.id) {
      alert('No product selected for deletion.');
      return;
    }
  
    if (confirm(`Are you sure you want to delete "${this.selectedProduct.name}"?`)) {
      this.productService.delete(this.selectedProduct.id).subscribe({
        next: () => {
          alert('Product deleted!');
          this.form.reset();
          this.selectedProduct = undefined;
          // You can emit an event here if needed to refresh a product list
        },
        error: (err) => {
          console.error('Deletion failed:', err);
          alert('Could not delete product.');
        }
      });
    }
  }
  
}
