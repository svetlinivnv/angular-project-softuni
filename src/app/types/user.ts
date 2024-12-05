export interface UserInterface {
  email: string;
  username: string;
}

export interface UserDocument {
  uid: string;
  email: string;
  username: string;
  profileImgUrl: string | null;
  createdAt: string;
}
