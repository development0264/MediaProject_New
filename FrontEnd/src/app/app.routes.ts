import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// https://angular.io/tutorial/toh-pt5

// FILTER
import { AuthGuard } from './guards/auth.guard';

/*CON LA CREACIÓN DEL ARCHIVO INDEX.PAGES NOS AHORRAMOS TENER QUE HACER
UNA IMPORTACIÓN POR CADA COMPONENTE DE LAS VISTAS*/
import {
    ContactUsComponent,
    NotificationComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    //PersonComponent,
    NotFoundComponent,
    UserComponent,
    DashboardComponent,
    SharedComponent
} from './utils/index.pages';

// LAYOUTS
import { AdminLayoutComponent } from './modules/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './modules/login-layout/login-layout.component';

// ROUTES
const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'shared', component: SharedComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'notification', component: NotificationComponent }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: 'resetpassword', component: ResetPasswordComponent },
            { path: 'forgotpassword', component: ForgotPasswordComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'login', component: LoginComponent },
            { path: '404', component: NotFoundComponent },
            { path: '**', redirectTo: '/404' }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

