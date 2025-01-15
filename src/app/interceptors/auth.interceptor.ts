import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJlbHRvbm1lc3NpYXMiLCJpYXQiOjE3MzY4MDIyMzcsImV4cCI6MTczNjgwNzYzN30.j11AhNau6cCYdKMKw6hggQLHBvYuiH2cDepw-Yz7X6U';
 

  
  if(token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })
    return next(req);
  }
  return next(req).pipe(
    catchError((error) => {
      console.error("Erro na requisicao", error);
      return throwError(() => error)
    })
  );
};
