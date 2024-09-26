import { Component } from '@angular/core';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent {

}
