import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LocationComponent } from "./components/locations/location.component";
import { AuthGuard } from './services/auth.guard';
import {LocComponent} from "./components/location/loc.component";

const routes: Routes = [{
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    component: LocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'locations/:id',
    component: LocComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
