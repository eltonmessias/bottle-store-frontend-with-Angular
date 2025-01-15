import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  credentials = {username:'', password:''};

  constructor(private authService:AuthService, private router: Router) {}


  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
          console.log('Token recebido:', response.token);
          localStorage.setItem('token', response.token)
          this.router.navigate(['/home']); // Redireciona para a página principal após o login
       
      },
      error: (err) => {
        console.error('Erro no login', err);
        alert('Credenciais inválidas');
      }
    });
  
  

  }
  
  
  
  
  

  }
