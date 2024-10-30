import { Component, inject } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ParkingFeeService } from '../../services/parking-fee.service';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss',
})
export class PricesComponent {
  authService = inject(DataAuthService);
  parkingFeeService = inject(ParkingFeeService);
  admin = this.authService.user?.admin;

  updateValue(id: string) {
    Swal.fire({
      title: 'Update parking fee',
      html: `<input type="text" id="cost" class="swal2-input" placeholder="Input new value">`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const rateInput = document.getElementById('cost') as HTMLInputElement;
        if (!rateInput || !rateInput.value) {
          Swal.showValidationMessage('Please, input a new rate value.');
          return false;
        }
        return { value: rateInput.value };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value } = result.value;
        await this.parkingFeeService.updateFee(id, value);
      }
    });
  }
}
