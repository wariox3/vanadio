import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 * Opciones para la configuración de cookies
 */
export interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date | string | number;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  httpOnly?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly documentIsAccessible: boolean;

  constructor(
    // eslint-disable-next-line
    @Inject(DOCUMENT) private document: Document,
    // eslint-disable-next-line
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.document = document;
    this.platformId = platformId;
    this.documentIsAccessible = isPlatformBrowser(this.platformId);
  }

  /**
   * Obtiene el valor de una cookie por nombre
   * @param name Nombre de la cookie
   * @returns Valor de la cookie o null si no existe
   */
  get(name: string): string | null {
    if (!this.documentIsAccessible) {
      return null;
    }

    const encodedName = encodeURIComponent(name);
    const cookies = this.document.cookie.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === encodedName) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }

  /**
   * Establece una cookie con el nombre y valor proporcionados
   * @param name Nombre de la cookie
   * @param value Valor de la cookie
   * @param options Opciones adicionales para la cookie
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (!this.documentIsAccessible) {
      return;
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Procesar opciones
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.expires) {
      let expiresDate: Date;

      if (typeof options.expires === 'number') {
        expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + options.expires * 1000);
      } else if (typeof options.expires === 'string') {
        expiresDate = new Date(options.expires);
      } else {
        expiresDate = options.expires;
      }

      cookieString += `; expires=${expiresDate.toUTCString()}`;
    } else if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    if (options.httpOnly && this.isHttpOnlySupported()) {
      cookieString += '; httponly';
    }

    this.document.cookie = cookieString;
  }

  /**
   * Elimina una cookie por nombre
   * @param name Nombre de la cookie a eliminar
   * @param path Ruta de la cookie (debe coincidir con la usada al crearla)
   * @param domain Dominio de la cookie (debe coincidir con la usada al crearla)
   */
  delete(name: string, path?: string, domain?: string): void {
    this.set(name, '', {
      path,
      domain,
      maxAge: -1,
    });
  }

  /**
   * Verifica si existe una cookie con el nombre proporcionado
   * @param name Nombre de la cookie
   * @returns true si la cookie existe, false en caso contrario
   */
  has(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }

    return this.get(name) !== null;
  }

  /**
   * Obtiene todas las cookies como un objeto clave-valor
   * @returns Objeto con todas las cookies
   */
  getAll(): Record<string, string> {
    if (!this.documentIsAccessible) {
      return {};
    }

    const cookies = this.document.cookie.split('; ');
    const result: Record<string, string> = {};

    for (const cookie of cookies) {
      const [encodedName, encodedValue] = cookie.split('=');
      const name = decodeURIComponent(encodedName);
      const value = decodeURIComponent(encodedValue);
      result[name] = value;
    }

    return result;
  }

  /**
   * Calcula la fecha de expiración para una cookie
   * @param hora Horas de expiración
   * @returns Fecha de expiración
   */
  calcularTiempoCookie(hora: number) {
    return new Date(new Date().getTime() + hora * 60 * 60 * 1000);
  }

  /**
   * Determina el dominio adecuado para las cookies según el entorno
   * - Para localhost o IPs: no establece dominio (undefined)
   * - Para dominios reales: establece el dominio principal con punto inicial (.example.com)
   *   para permitir compartir entre subdominios
   *
   * @returns El dominio adecuado para las cookies o undefined para localhost/IPs
   */
  getDomainForCookies(): string | undefined {
    const hostname = window.location.hostname;

    // Para localhost, no establecer dominio (undefined)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return undefined;
    }

    // Para IPs, no establecer dominio
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return undefined;
    }

    // Para dominios reales, usar el dominio principal para permitir subdominios
    // Ejemplo: si estamos en app.example.com, usamos .example.com
    const parts = hostname.split('.');
    if (parts.length > 1) {
      // Obtener el dominio principal (últimos dos segmentos)
      return '.' + parts.slice(-2).join('.');
    }

    return undefined;
  }

  /**
   * Obtiene la configuración estándar para cookies de autenticación
   * @param durationHours Duración de la cookie en horas (por defecto 24)
   * @returns Opciones de configuración para cookies de autenticación
   */
  getAuthCookieOptions(durationHours: number = 24): CookieOptions {
    return {
      expires: this.calcularTiempoCookie(durationHours),
      path: '/',
      domain: this.getDomainForCookies(),
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:',
    };
  }

  /**
   * Obtiene la configuración para cookies de sesión (que expiran al cerrar el navegador)
   * @returns Opciones de configuración para cookies de sesión
   */
  getSessionCookieOptions(): CookieOptions {
    return {
      path: '/',
      domain: this.getDomainForCookies(),
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:',
    };
  }

  /**
   * Verifica si el navegador soporta la bandera HttpOnly
   * @returns true si soporta HttpOnly, false en caso contrario
   */
  private isHttpOnlySupported(): boolean {
    // HttpOnly no puede ser establecido desde JavaScript en navegadores modernos
    // Esta función es más para documentación que para uso real
    return false;
  }
}
