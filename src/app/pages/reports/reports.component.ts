import { Component } from '@angular/core';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
