import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component:HomeComponent},
    {path: 'app', component:AppComponent},
    {path: 'inventory', component:InventoryComponent},
    {path: 'reports', component:ReportsComponent}
];
