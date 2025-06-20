import { Usuario } from './usuario.interface';

export interface LoginResponse {
  token: string;
  'refresh-token': string;
  user: Usuario;
}

export interface RegistroResponse {
  usuario: Usuario;
}
