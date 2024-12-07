import { Component, inject, OnInit } from '@angular/core';
import { set } from '@angular/fire/database';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
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

  userId: string | null = JSON.parse(localStorage.getItem('user') || '').uid;
  products: any[] = [];

  async ngOnInit(): Promise<any> {
    this.products = [];
    const docSnap = await getDocs(collection(this.firestore, 'products'));
    docSnap.forEach((doc) => {
      let isOwn: boolean = false;
      if (doc.data()['createdBy'] === this.userId) {
        isOwn = true;
      }
      this.products.push({ ...doc.data(), isOwn });
    });
    console.log(this.products);
  }

  getProductDetails(productId: string) {
    this.productService.getDetails(productId);
  }

  async deleteProduct(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmed) {
      await deleteDoc(doc(this.firestore, 'products', id));
      this.ngOnInit();
    }
  }
}
