import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../data/models/dtos';



export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    // defining events with payload using the `props` function
    'Login': props<{ email: string, password: string }>(),
    'Logout': emptyProps(),
    'Login Success': props<{ user: IUser }>(),
    // defining an event without payload using the `emptyProps` function
    'Set Token': props<{ token: string }>(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: any }>(),
  },
});
