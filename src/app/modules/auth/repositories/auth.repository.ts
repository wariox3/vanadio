import { inject, Injectable } from '@angular/core';
import { HttpBaseRepository } from '@app/core/repository/http-base.repository';
import { Login } from '../interfaces/login.interface';
import { LoginResponse } from '../interfaces/auth.interface';
import { Register, RegisterResponse } from '../interfaces/register.interface';
import { RecoverPasswordResponse } from '../interfaces/recover-password.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private httpBase = inject(HttpBaseRepository);

  login(credenciales: Login) {
    return this.httpBase.post<LoginResponse>('seguridad/login/', credenciales);
  }

  register(usuario: Register) {
    return this.httpBase.post<RegisterResponse>('seguridad/usuario/', usuario);
  }

  recoverPassword(email: string) {
    return this.httpBase.post<RecoverPasswordResponse>(
      'seguridad/usuario/cambio-clave-solicitar/',
      {
        username: email,
        accion: 'clave',
      }
    );
  }

  // recuperarClave(email: string) {
  //   return this.http.post(
  //     `${environment.url_api}/seguridad/usuario/cambio-clave-solicitar/`,
  //     { username: email, accion: "clave" },
  //     { context: noRequiereToken() }
  //   );
  // }

  // cargarImagen(usuario_id: Number | string, imagenB64: string) {
  //   return this.http.post<{
  //     cargar: boolean;
  //     imagen: string;
  //   }>(`${environment.url_api}/seguridad/usuario/cargar-imagen/`, {
  //     usuario_id,
  //     imagenB64,
  //   });
  // }

  // eliminarImagen(usuario_id: Number | string) {
  //   return this.http.post<{
  //     limpiar: boolean;
  //     imagen: string;
  //   }>(`${environment.url_api}/seguridad/usuario/limpiar-imagen/`, {
  //     usuario_id,
  //   });
  // }

  // actualizarInformacion(data: enviarDatosUsuario) {
  //   return this.http.put<UsuarioInformacionPerfil>(
  //     `${environment.url_api}/seguridad/usuario/${data.id}/`,
  //     {
  //       nombre: data.nombre,
  //       apellido: data.apellido,
  //       nombre_corto: data.nombreCorto,
  //       telefono: data.telefono,
  //       idioma: data.idioma,
  //       cargo: data.cargo,
  //       numero_identificacion: data.numero_identificacion,
  //     },
  //   );
  // }

  // perfil(codigoUsuario: number) {
  //   return this.http.get<UsuarioInformacionPerfil>(
  //     `${environment.url_api}/seguridad/usuario/${codigoUsuario}/`,
  //   );
  // }
}
