import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { TokenService } from '@app/modules/auth/services/token.service';

/**
 * Guard de autenticación que verifica si el usuario está autenticado
 * mediante la validación del token JWT.
 *
 * Si el token es válido, permite el acceso a la ruta.
 * Si el token no es válido o no existe, redirige al usuario a la página de login.
 *
 * @returns true si el usuario está autenticado, o un UrlTree para redirigir al login
 */
export const authGuard: CanMatchFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Verificar si el token es válido
  if (tokenService.validarToken()) {
    return true;
  }

  // Si no hay token válido, redirigir a la página de login
  return router.createUrlTree(['/auth/login']);
};
