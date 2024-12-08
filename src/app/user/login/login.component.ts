import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ToastComponent, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  errorCode: string | null = null;

  login(form: NgForm) {
    if (form.invalid) {
      this.errorCode = null;
      setTimeout(() => {
        this.errorCode = 'Please, fill in login data!';
      });
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe({
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
