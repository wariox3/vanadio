import { Usuario } from './usuario.interface';

export interface Register {
  username: string;
  password: string;
  confirmarContrasena: string;
  terminoCondicion: boolean;
}

export interface RegisterResponse {
  usuario: Usuario;
}
