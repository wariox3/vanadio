export interface RecoverPasswordResponse {
  verificacion: RecoverPasswordVerification;
}

export interface RecoverPasswordVerification {
  id: number;
  token: string;
  estado_usado: boolean;
  vence: string;
  accion: string;
  usuario_id: number;
  contenedor_id: number | null;
  usuario_invitado_username: string | null;
}
