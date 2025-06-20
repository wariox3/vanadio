import { HttpHandlerFn, HttpRequest, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@app/modules/auth/services/token.service';
import { CookieService } from '@app/core/services/cookie.service';
import { LOCALSTORAGE_KEYS } from '@app/core/constants/localstorage-keys.constant';

/**
 * Interceptor que añade el token de autenticación a las peticiones HTTP si existe
 */
export const tokenInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
  const tokenService = inject(TokenService);
  const cookieService = inject(CookieService);

  // Verificar si hay un token válido
  if (tokenService.validarToken()) {
    // Si hay token válido, lo añadimos a la petición
    return next(agregarTokenARequest(request, cookieService));
  }

  // Si no hay token o no es válido, dejamos pasar la petición sin modificar
  return next(request);
};

/**
 * Función auxiliar para añadir el token a una petición HTTP
 * @param request Petición HTTP original
 * @param tokenService Servicio de token
 * @returns Nueva petición HTTP con el token añadido
 */
function agregarTokenARequest(
  request: HttpRequest<unknown>,
  cookieService: CookieService
): HttpRequest<unknown> {
  const token = cookieService.get(LOCALSTORAGE_KEYS.AUTH_TOKEN);

  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`),
  });
}
