import { inject, Injectable } from '@angular/core';
import { AvailabilityService } from './availability.service';
import { ISale } from '../interfaces/Sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  availabilityService = inject(AvailabilityService);
  lastSales: ISale[] = [];

  constructor() {
    this.getLastSales();
  }

  async getLastSales(quantity = 5) {
    if (
      !this.availabilityService.sales ||
      this.availabilityService.sales.length === 0
    ) {
      console.error('There are no sales.');
    }

    const filteredSales = this.availabilityService.sales.filter(
      (s) => s.departureTime !== null && s.departureTime !== undefined
    );

    const lastSales = filteredSales
      .sort(
        (a, b) =>
          new Date(b.entranceTime.replace(' ', 'T')).getTime() -
          new Date(a.entranceTime.replace(' ', 'T')).getTime()
      )
      .slice(0, quantity);

    this.lastSales = lastSales;
  }
}
