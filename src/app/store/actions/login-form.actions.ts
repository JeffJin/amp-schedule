import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../data/models/dtos';

export enum LoginFormStatus {
  Submitting = 'Submitting',
  Typing = 'Typing',
  Failure = 'Failure',
  Success = 'Success',
  None = '',
}
export enum LoginFormErrorType {
  Email = 'Email',
  Password = 'Password',
  Server = 'Server',
  Timeout = 'Timeout',
}
export interface LoginFormError {
  type: LoginFormErrorType;
  message: string;
}
export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
  status: LoginFormStatus;
  errors: LoginFormError[];
}

export const LoginFormActions = createActionGroup({
  source: 'Login Form',
  events: {
    // defining events with payload using the `props` function
    'Submit Form': emptyProps(),
    'Reset Login Form': emptyProps(),
    'Update Status': props<{ status: LoginFormStatus }>(),
    'Update Error': props<{ error: LoginFormError }>(),
    'Update Email': props<{ payload: string }>(),
    'Update Remember Me': props<{ payload: boolean }>(),
    'Update Password': props<{ payload: string }>(),
    // defining an event with payload using the props factory
    'Login Failure':(error: LoginFormError) => ({ error }),
  },
});
