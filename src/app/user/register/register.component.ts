import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { EmailDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ToastComponent, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  errorCode: string | null = null;

  register(form: NgForm) {
    if (form.invalid) {
      this.errorCode = null;
      setTimeout(() => {
        this.errorCode = 'Please, fill in register data!';
      });
      return;
    }

    const { username, email, password } = form.value;

    this.userService.register(username, email, password).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorCode = null;
        setTimeout(() => {
          this.errorCode = err.code;
        });
      },
    });
  }
}
