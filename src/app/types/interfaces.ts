import { Timestamp } from '@angular/fire/firestore';

export interface ProductInterface {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdBy: string;
  productId: string;
  createdAt?: Timestamp;
}

export interface UserDocument {
  uid: string;
  email: string;
  username: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  createdAt: string;
}
