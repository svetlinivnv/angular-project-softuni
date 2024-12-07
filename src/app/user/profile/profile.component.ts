import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any;
  newPassword: string = '';
  confirmPassword: string = '';
  errorCode: string | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getSession();
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  updateProfile(form: NgForm): void {
    this.newPassword = form.value.password;
    this.confirmPassword = form.value.confirmPassword;
    console.log(this.newPassword, this.confirmPassword);

    if (this.newPassword !== this.confirmPassword) {
      this.errorCode = 'Confirm password does not match password!';
      return;
    }

    const updatedUser = {
      ...this.user,
      username: this.user.username,
      email: this.user.email,
      password: this.newPassword || this.user.password,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        this.errorCode = 'success';
        this.router.navigate(['/profile']);
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
