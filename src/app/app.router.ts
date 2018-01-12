// import { ModuleWithProviders } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// // Components
// import {LoginComponent} from '../app/modules/auth/login/login.component';
// import {ForgotPasswordComponent} from '../app/modules/auth/forgot-password/forgot-password.component';
// import {ResetPasswordComponent} from '../app/modules/auth/reset-password/reset-password.component';

// export const routes: Routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: "login", component: "LoginComponent" },
//     { path: 'auth', loadChildren: './components/auth/auth-layout/auth-layout.module#AuthModule' }
// ]

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { CandidatesComponent } from './modules/candidates/candidates.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { OrderDetailsComponent } from './modules/orders/order-details/order-details.component'
import { ClientDetailsComponent } from './modules/clients/client-details/client-details.component';
import { CandidateDetailsComponent } from './modules/candidates/candidate-details/candidate-details.component';
//import { UsersComponent } from './modules/users/users.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'candidates/new', component: CandidateDetailsComponent },
    { path: 'candidates/:id', component: CandidateDetailsComponent },
    { path: 'candidates', component: CandidatesComponent },
    { path: 'clients/new', component: ClientDetailsComponent },
    { path: 'clients/:id', component: ClientDetailsComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'order/:id', component: OrderDetailsComponent },
    //{ path: 'users', component: UsersComponent },
    { path: 'users/new', component: UserDetailsComponent },
    { path: 'users/:id', component: UserDetailsComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
