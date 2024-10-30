import { Component, inject } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DashboardComponent, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  saleService = inject(SaleService);
}
