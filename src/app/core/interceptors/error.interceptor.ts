import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../services/modal/modal.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const modalService = inject(ModalService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ocurrió un error inesperado.';

      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor.';
      } else if (error.status === 400) {
        message = error.error?.message || 'Solicitud incorrecta.';
      } else if (error.status === 401) {
        message = 'Sesión expirada. Por favor inicia sesión nuevamente.';
      } else if (error.status === 403) {
        message = 'No tienes permisos para realizar esta acción.';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado.';
      } else if (error.status >= 500) {
        message = 'Error interno del servidor. Intenta más tarde.';
      }

      modalService.show({
        message,
        isError: true,
      });

      return throwError(() => error);
    })
  );
};