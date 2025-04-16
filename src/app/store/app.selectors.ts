import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetState, AuthState } from './app.state';
import { assetsKey } from './reducers/assets.reducers';
import { authKey } from './reducers/auth.reducers';
import { dashboardKey, DashboardState } from './reducers/dashboard.reducers';

export const selectAuth =  createFeatureSelector<AuthState>(authKey);

export const selectUser = createSelector(
  selectAuth,
  auth => auth.user,
);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  auth => auth.user !== null && !!auth.user.id && !!auth.user.userName,
);

export const selectAssets = createFeatureSelector<AssetState>(assetsKey);

export const selectImages = createSelector(
  selectAssets,
  (state: AssetState) => state.images,
);

export const selectCurrentImage =  createSelector(
  selectAssets,
  (state: AssetState) => state.currentImage,
);

export const selectVideos =  createSelector(
  selectAssets,
  (state: AssetState) => state.videos,
);

export const selectCurrentVideo =  createSelector(
  selectAssets,
  (state: AssetState) => state.currentVideo,
);

export const selectAudios =  createSelector(
  selectAssets,
  (state: AssetState) => state.audios,
);

export const selectDashboard = createFeatureSelector<DashboardState>(dashboardKey);

export const selectDashboardSideMenuHidden = createSelector(
  selectDashboard,
  (state: DashboardState) => !state.sideMenuShown,
)
