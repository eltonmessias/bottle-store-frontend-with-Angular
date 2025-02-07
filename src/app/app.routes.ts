import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'inventory', component:InventoryComponent, canActivate: [AuthGuard]},
    {path: 'reports', component:ReportsComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
    {path: 'users', component:UsersComponent, canActivate: [AuthGuard]},
    {path: 'clients', component:ClientsComponent, canActivate: [AuthGuard]}
];
