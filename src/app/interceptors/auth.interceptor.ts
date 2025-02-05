import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(req).pipe(
    catchError(error => {

      // if (error.status === 401) {
      //   return authService.refreshToken().pipe(
      //     switchMap(() => {
      //       // Após renovar, refaz a requisição com o novo token
      //       const newToken = authService.getToken();
      //       const newRequest = req.clone({setHeaders: { Authorization: `Bearer ${newToken}` }});
      //       return next(newRequest);
      //     }),
      //     catchError(refreshError => {
      //       authService.logout();
      //       router.navigate(['/login']);
      //       return throwError(() => refreshError);
      //     })
      //   );
      // }
      return throwError(() => error);
    })
  );
};
