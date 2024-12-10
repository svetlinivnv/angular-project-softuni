import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './product/catalog/catalog.component';
import { DetailsComponent } from './product/details/details.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'add-product',
    loadComponent: () =>
      import('./product/add-product/add-product.component').then(
        (c) => c.AddProductComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-product/:id',
    loadComponent: () =>
      import('./product/edit-product/edit-product.component').then(
        (c) => c.EditProductComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: DetailsComponent },
  {
    path: 'cart',
    loadComponent: () =>
      import('./user/cart/cart.component').then((c) => c.CartComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
