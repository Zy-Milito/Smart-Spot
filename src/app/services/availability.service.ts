import { Injectable, inject } from '@angular/core';
import { IParkingSpot } from '../interfaces/parkingSpot';
import { ISale } from '../interfaces/Sale';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  parkingSpots: IParkingSpot[] = [];
  sales: ISale[] = [];
  authService = inject(DataAuthService);

  constructor() {
    this.loadData();
  }

  async loadData() {
    await this.getParkingSpots();
    await this.getSales();
    this.linkSalesWithParkingSpots();
  }

  async getParkingSpots() {
    const res = await fetch('http://localhost:4000/cocheras', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    if (res.status !== 200) return;
    const resJson: IParkingSpot[] = await res.json();
    this.parkingSpots = resJson;
  }

  async getSales() {
    const res = await fetch('http://localhost:4000/estacionamientos', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    if (res.status !== 200) return;
    const resJson: ISale[] = await res.json();
    this.sales = resJson;
  }

  linkSalesWithParkingSpots() {
    this.parkingSpots = this.parkingSpots.map((parkingSpot) => {
      const sale = this.sales.find((s) => s.parkingSpotId === parkingSpot.id);
      return { ...parkingSpot, sale };
    });
  }

  async addBooth(parkingSpotNumber: string) {
    const parkingSpot = { number: parkingSpotNumber };
    const res = await fetch(environment.API_URL + 'cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(parkingSpot),
    });
    if (res.status !== 200) {
      console.log('Error during creation process.');
    } else {
      console.log('Creation successful.');
      this.loadData();
    }
  }

  async removeRow(parkingSpotId: number) {
    const res = await fetch(environment.API_URL + `cocheras/${parkingSpotId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });

    if (res.status !== 200) {
      console.error('Error during deletion process.');
    } else {
      console.log('Deletion successful.');
      this.loadData();
    }
  }

  async disableBooth(parkingSpotId: number) {
    const res = await fetch(
      environment.API_URL + 'cocheras/' + parkingSpotId + '/disable',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('authToken'),
        },
      }
    );
    if (res.status === 200) {
      console.log('Parking spot disabled.');
      this.loadData();
    } else {
      console.warn('Error while trying to disable the parking spot.');
    }
  }

  async enableBooth(parkingSpotId: number) {
    const res = await fetch(
      environment.API_URL + 'cocheras/' + parkingSpotId + '/enable',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('authToken'),
        },
      }
    );
    if (res.status === 200) {
      console.log('Parking spot enabled.');
      this.loadData();
    } else {
      console.warn('Error while trying to enable the parking spot.');
    }
  }

  async openSale(plate: string, entranceUserId: string, parkingSpotId: number) {
    const body = { plate, entranceUserId, parkingSpotId };
    const res = await fetch(environment.API_URL + 'estacionamientos/abrir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) {
      console.log('Error while opening the sale.');
    } else {
      console.log('Sale creation successful.');
      this.loadData();
    }
  }

  async closeSale(plate: string, entranceUserId: string) {
    const body = { plate, entranceUserId };
    const res = await fetch(environment.API_URL + 'estacionamientos/cerrar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) {
      console.log('Sale closure error.');
    } else {
      console.log('Sale closure successful.');
      this.loadData();
    }
  }
}
