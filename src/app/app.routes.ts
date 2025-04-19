import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AuthGuard } from './guards/auth.guard';
import { SalesComponent } from './pages/sales/sales.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { TopCategorySalesComponent } from './components/dashboard/top-category-sales/top-category-sales.component';

export const routes: Routes = [
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'inventory', component:InventoryComponent, canActivate: [AuthGuard]},
    {path: 'reports', component:ReportsComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
    {path: 'users', component:UsersComponent, canActivate: [AuthGuard]},
    {path: 'clients', component:ClientsComponent, canActivate: [AuthGuard]},
    {path: 'sales', component:SalesComponent, canActivate: [AuthGuard]},
    {path: 'createCategory', component:CreateCategoryComponent},
    {path: 'top-category-sales-chart', component:TopCategorySalesComponent}
];
