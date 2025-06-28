import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../product.model';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-card',
  imports: [ RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: Product;

  constructor(private productService: ProductService) {}


  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      if (this.product && this.product.id !== undefined) {
        this.productService.delete(this.product.id).subscribe(() => {
          alert('Product deleted successfully!');
          console.log('Deleting product with ID:', this.product?.id);

        });
      }
      else{
        console.log('deletion failed')
        console.log('ERROR Deleting product with ID:', this.product?.id);
        
      }
    }
  }
}
