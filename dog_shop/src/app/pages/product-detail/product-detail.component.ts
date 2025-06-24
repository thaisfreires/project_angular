import { Component } from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product: Product[] = [];
  selectedProduct: Product | undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.viewDetails(id);
  }

  viewDetails(id: number): void {
    this.productService.getProductById(id)
     .subscribe((product: Product) => {
         this.selectedProduct = product;
       })       
  }
  addToCart(): void {
    alert('Product added to cart');
  }
}
