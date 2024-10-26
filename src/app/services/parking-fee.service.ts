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
}
