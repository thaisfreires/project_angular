import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/aboutus/aboutus.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { EditFormComponent } from './product/edit-form/edit-form.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'product/create', component: ProductFormComponent},
    {path: 'product/:id', component: ProductDetailComponent},
    {path: 'product/update/:id', component: EditFormComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    //{path: '**', component: NotFoundComponent}
];
