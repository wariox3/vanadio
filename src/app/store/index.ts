import { authReducer } from '@app/modules/auth/store/reducers/auth.reducer';
import { AuthEffects } from '@app/modules/auth/store/effects/auth.effect';

export const StoreApp = {
  auth: authReducer,
};

export const EffectsApp = [AuthEffects];
