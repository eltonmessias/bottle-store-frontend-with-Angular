import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs'; // Adicione `tap` para executar ações colaterais

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.url, credentials).pipe(
      tap((response: any) => {
        console.log('Resposta do login:', response); // Log para verificar a resposta do backend
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
        } else {
          console.error('Token não encontrado.');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove o token ao fazer logout
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }
}
