import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { EventsListComponent } from './events-list/events-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'characters', component: CharactersListComponent },
  { path: 'comics', component: ComicsListComponent },
  { path: 'events', component: EventsListComponent }
];
