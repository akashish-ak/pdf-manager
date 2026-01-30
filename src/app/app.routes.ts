import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('../login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('../signup/signup.component').then(c => c.SignupComponent)
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('../dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
