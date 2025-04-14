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
  on(AuthApiActions.loginSuccess, (state, { user }) =>
    ({ ...state, user })
  ),
  on(AuthApiActions.logoutSuccess, (state, { }) =>
    ({ ...state, user: null, error: '' })
  ),
);

