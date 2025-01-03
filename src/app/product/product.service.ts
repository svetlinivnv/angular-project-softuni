import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { ProductInterface } from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  user: string | null = localStorage.getItem('user');

  userId: string | null = (() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).uid;
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        return null;
      }
    }
    return null;
  })();

  private firestore = inject(Firestore);

  product = {};
  products: any[] = [];

  async getDetails(productId: string | null) {
    if (!productId) {
      return;
    }
    const docSnap = await getDoc(doc(this.firestore, `products/${productId}`));
    return docSnap.data() as ProductInterface;
  }

  async addToCart(productId: string | null) {
    if (!productId) {
      return;
    }

    try {
      const productDetails = await this.getDetails(productId);
      if (!productDetails) {
        return;
      }
      const user = JSON.parse(this.user || '{}');
      if (!user.uid) {
        return;
      }
      const cartRef = doc(this.firestore, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);
      let cartData = cartSnap.exists() ? cartSnap.data() : {};

      if (!cartData['products']) {
        cartData['products'] = [];
      }
      cartData['products'].push(productDetails);
      await setDoc(cartRef, cartData);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  async getProducts(userId: string | null) {
    try {
      const productsRef = collection(this.firestore, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => {
        let isOwn = false;
        if (doc.data()['createdBy'] === userId) {
          isOwn = true;
        }
        return { ...doc.data(), isOwn, id: doc.id };
      });

      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getLastAddedProducts(productsToGet: number = 5) {
    try {
      const productsRef = collection(this.firestore, 'products');
      const q = query(
        productsRef,
        orderBy('createdAt', 'desc'),
        limit(productsToGet)
      );
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return products;
    } catch (error) {
      console.error('Error fetching last added products:', error);
      return [];
    }
  }

  async updateProduct(
    productId: string,
    updatedData: Partial<ProductInterface>
  ) {
    const productRef = doc(this.firestore, 'products', productId);
    await setDoc(productRef, updatedData, { merge: true });
  }

  async deleteProduct(id: string) {
    await deleteDoc(doc(this.firestore, 'products', id));
  }
}
