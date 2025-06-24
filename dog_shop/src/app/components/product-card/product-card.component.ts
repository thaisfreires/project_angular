import { Component, Input } from '@angular/core';
import { Product } from '../../product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [ RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: Product;

  showDetails(product: Product): void {
    console.log('Selected ID:', product.id)
  }
}
