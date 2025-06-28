import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent {

  @Input() selectedProduct!: Product;
  categories: Category[] = [];
  selectedFile?: File;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.loadCategories();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
    this.productService.getProductById(id).subscribe(product => {
      this.selectedProduct = product;

      this.form.patchValue({
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? 0,
        category: product.category?.id?.toString() ?? '',
      });
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
    if (event.target.files?.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  updateProduct() {
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
    this.router.navigate(['/products'])
  }
}
