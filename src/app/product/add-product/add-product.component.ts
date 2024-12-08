import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ProductInterface } from '../../types/interfaces';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  user: string | null = localStorage.getItem('user');
  constructor(private router: Router) {}

  firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  errorCode: string | null = null;

  product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    createdBy: JSON.parse(this.user || '').uid,
    productId: '',
    createdAt: Timestamp.now(),
  };

  createProduct(form: NgForm) {
    const { productName, productDescription, productPrice, productImage } =
      form.value;
    const productId = 'id_' + Math.random().toString(36).substr(2, 9);

    this.product.name = productName;
    this.product.description = productDescription;
    this.product.price = productPrice;
    this.product.imageUrl = productImage;
    this.product.productId = productId;

    if (form.invalid) {
      this.errorCode = null;
      setTimeout(() => {
        this.errorCode = 'Please, fill in product data!';
      });
      return;
    }

    const productDocRef = doc(this.firestore, `products/${productId}`);
    const productDocument: ProductInterface = this.product;
    this.router.navigate(['catalog']);
    return setDoc(productDocRef, productDocument);
  }
}
