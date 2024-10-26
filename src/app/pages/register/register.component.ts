import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IRegister } from '../../interfaces/register';
import { DataAuthService } from '../../services/data-auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(DataAuthService);
  router = inject(Router);

  errorReg = false;
  async register(regForm: NgForm) {
    const { username, email, password } = regForm.value;
    const regData: IRegister = { username, email, password };

    const res = await this.authService.register(regData);

    if (res?.statusText === 'Created') this.router.navigate(['/login']).then(() => {
      Swal.fire("Registration successful", "", "success");
    });
    else this.errorReg = true;
  }
}
