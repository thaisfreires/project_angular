import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

export const routes: Routes = [
    //{path: '', component: HomeComponent},
    {path: 'products', component: ProductCardComponent},
    //{path: 'dogs/:id', component: DogDetailComponent},
    //{path: 'about', component: AboutComponent},
    //{path: 'contact', component: ContactComponent},
    //{path: '**', component: NotFoundComponent}
];
