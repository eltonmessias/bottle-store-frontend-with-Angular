import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AuthService } from './services/auth.service';
import { LeftSidebarComponent } from "./components/left-sidebar/left-sidebar.component";
import { MainComponent } from "./components/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, LeftSidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  
}
