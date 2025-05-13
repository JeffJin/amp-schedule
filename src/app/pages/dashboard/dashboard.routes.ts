import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { provideState } from '@ngrx/store';
import { assetsKey, assetsReducer } from '../../store/reducers/assets.reducers';
import { dashboardKey, dashboardReducer } from '../../store/reducers/dashboard.reducers';
import { authGuard } from '../../guards/auth.guard';
import { VideoSettingsComponent } from './upload/video-settings/video-settings.component';
import { ImageSettingsComponent } from './upload/image-settings/image-settings.component';
import { AudioSettingsComponent } from './upload/audio-settings/audio-settings.component';
import { UploadComponent } from './upload/upload.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component')
      .then(c => c.DashboardComponent),
    providers: [
      provideState({ name: assetsKey, reducer: assetsReducer }),
      provideState({ name: dashboardKey, reducer: dashboardReducer }),
    ],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(c => c.OverviewComponent),
      },
      {
        path: 'videos',
        loadComponent: () => import('./videos/videos.component').then(c => c.VideosComponent),
      },
      {
        path: 'video/:videoId',
        loadComponent: () => import('./video-details/video-details.component').then(c => c.VideoDetailsComponent),
      },
      {
        path: 'images',
        loadComponent: () => import('./images/images.component').then(c => c.ImagesComponent),
      },
      {
        path: 'image/:imageId',
        loadComponent: () => import('./image-details/image-details.component').then(c => c.ImageDetailsComponent),
      },
      {
        path: 'documents',
        loadComponent: () => import('./documents/documents.component').then(c => c.DocumentsComponent),
      },
      {
        path: 'upload',
        component: UploadComponent,
        children: [
          {
            path: 'video',
            component: VideoSettingsComponent,
            // outlet: 'settings'
          },
          {
            path: 'image',
            component: ImageSettingsComponent,
            // outlet: 'settings'
          },
          {
            path: 'audio',
            component: AudioSettingsComponent,
            // outlet: 'settings'
          }
        ]
      },
      {
        path: 'history',
        loadComponent: () => import('./history/history.component').then(c => c.HistoryComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then(c => c.ReportsComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then(c => c.UsersComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard/overview',
    pathMatch: 'full',
  },
];
