import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Category, Product } from '../../product.model';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule],
  styleUrl: './product-form.component.scss',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit{

  @Input() selectedProduct?: Product;

  categories: Category[] = [];
  selectedFile?: File;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });  

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();

    if (this.selectedProduct) {
      this.form.patchValue({
        name: this.selectedProduct.name ?? '',
        description: this.selectedProduct.description ?? '',
        price: this.selectedProduct.price ?? 0,
        category: this.selectedProduct.category?.id?.toString() ?? '',
      });
    }
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log('loaded categories: ', categories)
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  saveProduct() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value ?? '');
    formData.append('description', this.form.get('description')?.value ?? '');
    formData.append('price', String(this.form.get('price')?.value ?? ''));
    const categoryId = this.form.get('category')?.value;
    console.log('categoryId: ',categoryId);

    if (categoryId){
      formData.append('category', categoryId.toString());
      console.log('CategoryId worked')
    }else{
      console.log('Category Id error')
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile.name);
      console.log('image filename sent: ', this.selectedFile.name);
    }

    if (this.selectedProduct?.id) {
      // Update
      this.productService.update(this.selectedProduct.id, formData).subscribe(() => {
        alert('Product updated!');
        this.form.reset();
      });
    } else {
      // Create
      this.productService.create(formData).subscribe(() => {
        alert('Product created!');
        this.form.reset();
      });
    }
  }

  redirect(){
    this.router.navigate(['/product-list'])
  }
}  
