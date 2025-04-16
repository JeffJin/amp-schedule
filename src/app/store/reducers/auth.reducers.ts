import { Action, createReducer, on } from '@ngrx/store';
import { AuthApiActions } from '../actions/auth.actions';
import { AuthState } from '../app.state';

export const authKey = 'auth';

export const initialState: AuthState = {
  user: null,
  error: '',
};

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => {
      console.log('authReducer::AuthApiActions.loginSuccess');
      return { ...state, user };
    }
  ),
  on(AuthApiActions.logoutSuccess, (state, {}) => {
      console.log('authReducer::AuthApiActions.logoutSuccess');
      return { ...state, user: null, error: '' };
    }
  ),
  on(AuthApiActions.logoutFailure, (state, {}) => {
      console.log('authReducer::AuthApiActions.logoutFailure');
      return { ...state, user: null, error: '' };
    }
  ),
);

