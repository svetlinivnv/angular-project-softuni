import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnChanges {
  errorMessage: string | null = null;
  @Input() errorCode: string | null = null;
  @Input() duration: number = 3000;
  ngOnChanges(): void {
    if (this.errorCode) {
      this.errorMessage = this.mapErrorCodeToMessage(this.errorCode);
    }

    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = null;
      }, this.duration);
    }
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
    };
    return errorMessages[code] || 'Unexpected server error has occurred.';
  }
}
