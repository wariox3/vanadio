import { inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '@environments/environment';
import { CookieService } from './cookie.service';
import { LOCALSTORAGE_KEYS } from '@app/core/constants/localstorage-keys.constant';

@Injectable({
  providedIn: 'root',
})
export class SubdominioService {
  private API_SUBDOMAIN = environment.apiSubdomain;
  private cookieService = inject(CookieService);

  constructor() {}

  /**
   * Obtiene la URL del subdominio actual de forma reactiva
   * @returns Observable con la URL completa del subdominio
   */
  getSubdominioUrl(): Observable<string> {
    const subdominio = this.cookieService.get(LOCALSTORAGE_KEYS.SUBDOMAIN);
    return of(`${this.API_SUBDOMAIN.replace('subdominio', subdominio || '')}`);
  }

  /**
   * Construye una URL completa para una ruta específica usando el subdominio actual
   * @param path Ruta relativa para añadir a la URL base del subdominio
   * @returns Observable con la URL completa
   */
  buildUrl(path: string): Observable<string> {
    return this.getSubdominioUrl().pipe(
      map(baseUrl => {
        // Asegurarse de que la URL base termina con / y la ruta no comienza con /
        const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
        return `${normalizedBaseUrl}${normalizedPath}`;
      })
    );
  }
}
