import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

// Selector de característica para obtener el estado de autenticación completo
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector para obtener el usuario actual
export const selectCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.user);

// Selector para verificar si el usuario está autenticado
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

// Selector para verificar si está cargando
export const selectIsLoading = createSelector(selectAuthState, (state: AuthState) => state.loading);

// Selector para obtener el error
export const selectAuthError = createSelector(selectAuthState, (state: AuthState) => state.error);
