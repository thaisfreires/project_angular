import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log('ProductComponent initialized. <<<TESTE>>>');
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
