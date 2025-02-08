import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {

  logoImagePath = 'assets/logo.png'

  items = [
    {
      RouterLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
    {
      RouterLink: 'inventory',
      icon: 'fal fa-box-open',
      label: 'Inventory'
    },
    {
      RouterLink: 'sales',
      icon: 'fal fa-chart-line',
      label: 'Sales'
    },
    {
      RouterLink: 'reports',
      icon: 'fal fa-file',
      label: 'Reports'
    },
    {
      RouterLink: 'users',
      icon: 'fal fa-users',
      label: 'Users'
    },
    {
      RouterLink: 'clients',
      icon: 'fal fa-user',
      label: 'Clients'
    }
  ]

  constructor(private router: Router, private authService:AuthService){}
  title = 'bottleStore';

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  logout() {
    this.authService.logout()
  }
}
