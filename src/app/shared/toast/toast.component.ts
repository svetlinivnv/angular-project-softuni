import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnChanges {
  message: string | null = null;
  @Input() errorCode: string | null = null;
  @Input() duration: number = 3000;

  ngOnChanges() {
    if (this.errorCode) {
      this.message = this.mapErrorCodeToMessage(this.errorCode);
    } else if (this.errorCode === 'success') {
      this.message = 'Profile successfully updated!';
    }

    setTimeout(() => {
      this.message = null;
    }, this.duration);
  }

  mapErrorCodeToMessage(code: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'Invalid email address.',
      'auth/email-already-in-use': 'This email has already been used.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/missing-email': 'Please enter email.',
      'auth/operation-not-allowed': 'This operation is not allowed.',
      'auth/user-not-found': 'User not found.',
      'auth/invalid-password': 'Invalid password.',
      'auth/invalid-credential': 'Invalid user credentials.',
      'auth/requires-recent-login':
        'Changing password requires recent login. Please re-login to change it.',
      'Confirm password does not match password!':
        'Confirm password does not match password!',
      'Please, fill in product data!': 'Please, fill in product data!',
      'Please, fill in login data!': 'Please, fill in login data!',
      'Please, fill in register data!': 'Please, fill in register data!',
    };

    return errorMessages[code] || 'Unexpected server error has occurred.';
  }
}
