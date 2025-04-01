import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { TodosComponent } from './pages/todos/todos.component';
import { SetupComponent } from './pages/setup/setup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', component: TodosComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'setup', component: SetupComponent },
];
