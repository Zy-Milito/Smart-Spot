import { Injectable, inject } from '@angular/core';
import { IParkingSpot } from '../interfaces/parking';
// import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  constructor() { }

  /* parkingSpot: Parking[] = [];

  authService = inject(DataAuthService);

  async getSpots() {
    const res = await fetch('http://localhost:4000/cocheras', {
      headers: {
        authorization: 'Bearer ' + this.authService.user?.token
      }
    });
    if (res.status !== 200) return;
    const resJson: Parking[] = await res.json();
    this.parkingSpot = resJson;
  } */

  parkingSpot: IParkingSpot[] = [
    {
      number: "A01",
      availability: true,
      access: "-",
      actions: "-"
    },
    {
      number: "A02",
      availability: true,
      access: "-",
      actions: "-"
    },
    {
      number: "A03",
      availability: false,
      access: "-",
      actions: "-"
    },
    {
      number: "B01",
      availability: true,
      access: "-",
      actions: "-"
    },
    {
      number: "B02",
      availability: true,
      access: "-",
      actions: "-"
    }
  ]

  lastNumber = this.parkingSpot[this.parkingSpot.length - 1]?.number || 0;
  addBooth() {
    this.parkingSpot.push({
      number: this.makeid(3),
      availability: true,
      access: "-",
      actions: "-"
    })
  }

  makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      if (counter == 0) {
        result += characters.charAt(Math.floor(Math.random() * 26));
        counter += 1;
      }

      result += numbers.charAt(Math.floor(Math.random() * 10));
      counter += 1;
    }

    return result;
  }

  removeRow(index: number) {
    this.parkingSpot.splice(index, 1);
  }

  disableBooth(index: number) {
    this.parkingSpot[index].availability = false;
  }

  enableBooth(index: number) {
    this.parkingSpot[index].availability = true;
  }
}
