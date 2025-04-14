import { createImmerReducer, immerOn } from 'ngrx-immer/store';
import { DashboardActions } from '../actions/dashboard-actions';

export const dashboardKey = 'dashboard';

export enum DashboardStatus {
  Searching = 'Searching',
  Loading = 'Loading',
  Loaded = 'Loaded',
  None = 'None',
}

export interface DashboardState {
  sideMenuShown: boolean;
  searchKey: string;
  status: DashboardStatus
}

export const initialState: DashboardState = {
  sideMenuShown: false,
  searchKey: '',
  status: DashboardStatus.None
};

export const dashboardReducer = createImmerReducer(
  initialState,
  immerOn(DashboardActions.toggleDashboardSideMenu, (draft) => {
      draft.sideMenuShown = !draft.sideMenuShown;
    }
  ),
  immerOn(DashboardActions.showDashboardSideMenu, (draft, { show }) => {
      draft.sideMenuShown = show;
    }
  ),
  immerOn(DashboardActions.searchRequested, (state, { key }) => {
      state.searchKey = key;
    }
  ),
);

