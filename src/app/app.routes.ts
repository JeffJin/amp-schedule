import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SetupComponent } from './pages/setup/setup.component';
import { ErrorComponent } from './pages/error/error.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { LatestComponent } from './pages/latest/latest.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'setup', component: SetupComponent, data: { guarded: true } },
  { path: 'tasks', component: TasksComponent, data: { guarded: true }  },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'latest', component: LatestComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'dashboard',
    data: { guarded: true },
    loadChildren: async () => (await import('./pages/dashboard/dashboard.routes')).dashboardRoutes
  },
  { path: '**', component: NotFoundComponent },

];
