import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IParkingSpot } from '../../interfaces/parking';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { AvailabilityService } from '../../services/availability.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [RouterModule, CommonModule, DashboardComponent],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss'
})
export class AvailabilityComponent {
  admin = true;

  parkingSpots: IParkingSpot[] = []

  service = inject(AvailabilityService);

  constructor() {
    this.parkingSpots = this.service.parkingSpot;
  }

  addBooth() {
    this.service.addBooth();
  }

  removeRow(index: number) {
    this.service.removeRow(index);
  }

  disableBooth(index: number) {
    this.service.disableBooth(index);
  }

  enableBooth(index: number) {
    this.service.enableBooth(index);
  }
}
