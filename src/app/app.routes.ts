import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'profile', component: ProfileComponent },
];
