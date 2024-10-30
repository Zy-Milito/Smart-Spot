import { inject, Injectable } from '@angular/core';
import { IFee } from '../interfaces/fee';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParkingFeeService {
  fees: IFee[] = [];
  authService = inject(DataAuthService);

  constructor() {
    this.getFees();
  }

  async getFees() {
    const res = await fetch(environment.API_URL + 'tarifas', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    if (res.status !== 200) {
      console.log('Error');
    } else {
      this.fees = await res.json();
    }
  }

  async updateFee(id: string, value: number) {
    const data = { id, value };
    const res = await fetch(environment.API_URL + 'tarifas/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      console.log('Parking rate modified successfully.');
      this.getFees();
    } else {
      console.warn('Error! Unable to update the parking rate.');
    }
  }
}
