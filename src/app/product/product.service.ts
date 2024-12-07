import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private firestore = inject(Firestore);

  product = {};

  async getDetails(productId: string | null): Promise<any> {
    if (!productId) {
      console.error('Product ID is missing!');
      return;
    }
    const docSnap = await getDoc(doc(this.firestore, `products/${productId}`));
    return docSnap.data();
  }
}
