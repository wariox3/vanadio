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
    return this.httpBase.post<LoginResponse>('seguridad/login/', {
      username: credenciales.username,
      password: credenciales.password,
      cf_turnstile_response: credenciales.cfTurnstileResponse,
      proyecto: credenciales.proyecto,
    });
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
}
