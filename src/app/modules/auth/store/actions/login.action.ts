import { createAction, props } from '@ngrx/store';
import { Login } from '../../interfaces/login.interface';
import { LoginResponse } from '../../interfaces/auth.interface';

export const enum LoginActionTypes {
  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
}

export const loginRequest = createAction(
  LoginActionTypes.LOGIN_REQUEST,
  props<{ credentials: Login }>()
);

export const loginSuccess = createAction(
  LoginActionTypes.LOGIN_SUCCESS,
  props<{ response: LoginResponse }>()
);

export const loginFailure = createAction(LoginActionTypes.LOGIN_FAILURE, props<{ error: any }>());

export const logout = createAction(LoginActionTypes.LOGOUT);
