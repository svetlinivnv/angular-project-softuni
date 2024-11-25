import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './product/catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailsComponent } from './product/details/details.component';
import { AddProductComponent } from './product/add-product/add-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'product/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  // User routing start
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'TODO: 404' },
];
