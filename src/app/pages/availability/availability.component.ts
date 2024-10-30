import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IParkingSpot } from '../../interfaces/parkingSpot';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { AvailabilityService } from '../../services/availability.service';
import Swal from 'sweetalert2';
import { ParkingFeeService } from '../../services/parking-fee.service';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [RouterModule, CommonModule, DashboardComponent],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss',
})
export class AvailabilityComponent {
  authService = inject(DataAuthService);
  availabilityService = inject(AvailabilityService);
  parkingFeeService = inject(ParkingFeeService);
  admin = this.authService.user?.admin;

  addBooth() {
    Swal.fire({
      title: 'Add new parking booth?',
      showCancelButton: true,
      confirmButtonText: 'Add',
      denyButtonText: 'Cancel',
      input: 'text',
      inputLabel: 'Booth number',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.availabilityService.addBooth(result.value);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  removeRow(parkingSpotId: number) {
    Swal.fire({
      title: 'Do you wish to remove this parking spot?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.availabilityService.removeRow(parkingSpotId);
      }
    });
  }

  disableBooth(parkingSpotId: number) {
    this.availabilityService.disableBooth(parkingSpotId);
  }

  enableBooth(parkingSpotId: number) {
    this.availabilityService.enableBooth(parkingSpotId);
  }

  openSale(parkingSpotId: number) {
    const entranceUserId = 'ADMIN';
    Swal.fire({
      title: 'Park Vehicle',
      html: `<input type="text" id="plate" class="swal2-input" placeholder="Input vehicle plate">`,
      showCancelButton: true,
      confirmButtonText: 'Park',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const plateInput = document.getElementById('plate') as HTMLInputElement;
        if (!plateInput || !plateInput.value) {
          Swal.showValidationMessage('Please, input a plate.');
          return false;
        }
        return { plate: plateInput.value };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { plate } = result.value;
        await this.availabilityService.openSale(
          plate,
          entranceUserId,
          parkingSpotId
        );
      }
    });
  }

  closeSale(parkingSpot: IParkingSpot) {
    const time = parkingSpot.sale?.entranceTime;
    let entranceDate;
    let hoursPassed = 0;
    let minutesPassed = 0;
    let plate: string;
    let fee: string;
    let total;

    if (time) {
      entranceDate = new Date(time);
      if (entranceDate) {
        const currentDate = new Date();
        const differenceInMilliseconds =
          currentDate.getTime() - entranceDate.getTime();
        hoursPassed = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        minutesPassed = Math.floor(
          (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );
      }

      plate = parkingSpot.sale?.plate!;

      const totalMinutes = hoursPassed * 60 + minutesPassed;
      if (totalMinutes <= 30) {
        fee = 'MEDIAHORA';
      } else if (totalMinutes <= 60) {
        fee = 'PRIMERAHORA';
      } else {
        fee = 'VALORHORA';
      }

      total = this.parkingFeeService.fees.find((f) => f.id === fee)?.value;
    }

    const formattedTime = entranceDate
      ? entranceDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

    Swal.fire({
      html: `
            <div style="text-align: left;">
                <h4>Start time: ${formattedTime}</h4>
                <h4>Elapsed time: ${hoursPassed} hours and ${minutesPassed} minutes</h4>
                <hr style="border: 1px solid #ccc;">
                <h2 style="margin: 20px 0 10px; text-align: center;">Total</h2>
                <div style="background-color: #28a745; color: white; font-size: 24px; padding: 10px; border-radius: 5px; text-align: center; margin: 0 auto; display: block; width: fit-content;">
                    $${total}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button id="confirm" class="swal2-confirm swal2-styled" style="background-color: #007bff; padding: 10px 24px;">Confirm</button>
                    <button id="return" class="swal2-cancel swal2-styled" style="background-color: #aaa; padding: 10px 24px;">Return</button>
                </div>
            </div>`,
      showConfirmButton: false,
      didOpen: () => {
        const confirmButton = document.getElementById('confirm');
        const returnButton = document.getElementById('return');

        if (confirmButton) {
          confirmButton.addEventListener('click', async () => {
            const departureUserId = 'ADMIN';
            await this.availabilityService.closeSale(plate, departureUserId);
            Swal.close();
          });
        }

        if (returnButton) {
          returnButton.addEventListener('click', () => {
            Swal.close();
          });
        }
      },
    });
  }
}
