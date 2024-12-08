import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  user: string | null = localStorage.getItem('user');
  private firestore = inject(Firestore);
  cart: any = {};
  totalSum: number = 0;

  ngOnInit(): void {
    if (this.user) {
      const userData = JSON.parse(this.user);
      this.getCart(userData.uid);
    }
  }

  async getCart(userId: string): Promise<void> {
    try {
      const cartDocRef = doc(this.firestore, 'carts', userId);
      const cartSnap = await getDoc(cartDocRef);

      if (cartSnap.exists()) {
        this.cart = cartSnap.data();
        this.cart.products.forEach((product: any) => {
          this.totalSum += product.price;
        });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  async removeProduct(productId: string): Promise<void> {
    const confirmed = window.confirm(
      'Are you sure you want to remove this product from your shopping cart?'
    );
    if (confirmed) {
      const productIndex = this.cart.products.findIndex(
        (product: any) => product.productId === productId
      );

      if (productIndex !== -1) {
        this.totalSum -= this.cart.products[productIndex].price;
        this.cart.products.splice(productIndex, 1);
        const cartDocRef = doc(
          this.firestore,
          'carts',
          JSON.parse(this.user || '').uid
        );
        await setDoc(cartDocRef, { products: this.cart.products });
      }
    }
  }
}
