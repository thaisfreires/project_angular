import { Component, Input } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: Product;

  showDetails(){
    
  }
}
