import { Component } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { ImageTextContentComponent } from "../../components/image-text-content/image-text-content.component";
import { ProductListComponent } from "../product-list/product-list.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, ImageTextContentComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

  
}
