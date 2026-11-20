import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Authservice } from '../services/authservice';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const router = inject(Router);

  const esApi = req.url.startsWith(environment.base);
  const token = authService.getToken();

  const peticion = esApi && token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(peticion).pipe(
    catchError(error => {
      // Un token vencido o inválido hace que el backend responda 401 incluso en rutas públicas.
      // En ese caso se cierra la sesión y se pide iniciar sesión otra vez.
      if (error.status === 401 && !req.url.endsWith('/login')) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
