import { Component, inject, OnInit } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {}
  private firestore = inject(Firestore);

  userId: string | null = (() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).uid;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  })();

  products: any[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts(this.userId);
  }

  async addToCart(productId: string) {
    await this.productService.addToCart(productId);
    this.router.navigate(['cart']);
  }

  async deleteProduct(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmed) {
      await this.productService.deleteProduct(id);
      this.ngOnInit();
    }
  }
}
