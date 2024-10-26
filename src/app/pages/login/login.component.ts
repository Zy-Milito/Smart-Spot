import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { ILogin } from '../../interfaces/login';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(DataAuthService);
  router = inject(Router);

  errorLogin = false;
  async login(loginForm: NgForm) {
    const { username, password } = loginForm.value;
    const loginData: ILogin = { username, password };

    const res = await this.authService.login(loginData);

    if (res?.statusText === 'OK') this.router.navigate(['/dashboard']);
    else this.errorLogin = true;
  }
}
