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
      'auth/invalid-email': 'Невалиден имейл адрес.',
      'auth/email-already-in-use': 'Този имейл е вече използван.',
      'auth/weak-password': 'Паролата трябва да съдържа поне 6 символа.',
      'auth/missing-email': 'Моля, въведете имейл.',
      'auth/operation-not-allowed': 'Регистрацията с имейл е забранена.',
      'auth/user-not-found': 'Потребителят не е намерен.',
      'auth/invalid-password': 'Невалидна парола.',
    };
    return errorMessages[code] || 'Възникна неочаквана грешка.';
  }
}
