import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs'; // Adicione `tap` para executar ações colaterais

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/bigbrother/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Resposta do login:', response);
        if (response && response.accessToken && response.refreshToken) {
          this.saveTokens(response.token, response.accessToken)
        } else {
          console.error('Tokens não retornados correctamente.');
        }
      }),
      catchError(error => {
        console.error("Erro no login ", error);
        return throwError(() => error);
      })
    );
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('Refresh token não encontrado.'));
    }
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.url}/refresh`, { refreshToken }).pipe(
      tap(response => this.saveTokens(response.accessToken, response.refreshToken)),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  getUsername(): Observable<{ username: string}> {
    return this.http.get<{username: string}>(`${this.url}/username`);
  }
}
