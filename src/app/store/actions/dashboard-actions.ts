import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    // defining events with payload using the `props` function
    'Toggle Dashboard Side Menu': emptyProps(),
    'Search Requested': props<{ key: string }>(),
    'Search Completed': props<{ results: any }>(),
    'Show Dashboard Side Menu': props<{ show: boolean }>(),
    'Search Failed': props<{ error: any }>(),
  },
});
