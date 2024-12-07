export interface UserInterface {
  email: string;
  username: string;
}

export interface UserDocument {
  uid: string;
  email: string;
  username: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  createdAt: string;
}
