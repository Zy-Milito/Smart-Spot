import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AvailabilityComponent } from './pages/availability/availability.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PricesComponent } from './pages/prices/prices.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { publicGuard } from './guards/public.guard';
import { adminGuard } from './guards/admin.guard';
import { loggedGuard } from './guards/logged.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [publicGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [publicGuard]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [loggedGuard],
        children: [
            {
                path: "availability",
                component: AvailabilityComponent
            },
            {
                path: "reports",
                component: ReportsComponent,
                canActivate: [adminGuard]
            },
            {
                path: "prices",
                component: PricesComponent
            },
            {
                path: "",
                redirectTo: "availability",
                pathMatch: "full"
            },
            {
                path: "**",
                redirectTo: "/not-found",
                pathMatch: "full"
            }
        ]
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
]
