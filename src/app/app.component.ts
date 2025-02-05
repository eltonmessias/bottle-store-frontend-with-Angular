import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router, private authService:AuthService){}
  title = 'bottleStore';

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  logout() {
    this.authService.logout()
  }
}
