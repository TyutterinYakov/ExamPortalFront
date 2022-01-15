import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [

  { path: 'register', component: SignupComponent, pathMatch:'full' },
  { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'login', component: LoginComponent, pathMatch:'full' },
  { path: 'user', component: UserDashboardComponent, pathMatch:'full', canActivate:[NormalGuard] },
  { path: 'admin', component: DashboardComponent, pathMatch:'full', canActivate:[AdminGuard],},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }