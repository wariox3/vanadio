import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from '@app/core/services/cookie.service';
import { LOCALSTORAGE_KEYS } from '@app/core/constants/localstorage-keys.constant';

/**
 * Interfaz para el token JWT decodificado
 */
interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

/**
 * Servicio para gestionar el token JWT de autenticación
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly cookieService = inject(CookieService);

  constructor() {}

  /**
   * Verifica si existe un token JWT y si es válido (no ha expirado)
   * @returns true si el token existe y es válido, false en caso contrario
   */
  validarToken(): boolean {
    const token = this.cookieService.get(LOCALSTORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
      return false;
    }

    try {
      const tokenDecodificado = jwtDecode<DecodedToken>(token);

      if (tokenDecodificado && tokenDecodificado.exp) {
        const tokenFecha = new Date(0);
        const fechaActual = new Date();
        tokenFecha.setUTCSeconds(tokenDecodificado.exp);

        return tokenFecha.getTime() > fechaActual.getTime();
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.cookieService.delete(LOCALSTORAGE_KEYS.AUTH_TOKEN); // Eliminar token inválido
      return false;
    }

    return false;
  }

  /**
   * Decodifica el token JWT y devuelve su contenido
   * @returns Contenido del token decodificado o null si no existe o es inválido
   */
  obtenerDatosToken(): DecodedToken | null {
    const token = this.cookieService.get(LOCALSTORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
      return null;
    }

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
