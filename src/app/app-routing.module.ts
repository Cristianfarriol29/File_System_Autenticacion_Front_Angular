import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { ForgotPasswordComponent } from '../app/pages/forgot-password/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '../app/pages/recover-password/recover-password/recover-password.component';
import { RegisterPageComponent } from '../app/pages/register-page/register-page.component';
import { LoginPageComponent } from '../app/pages/login-page/login-page.component';
import { AdminPageComponent } from '../app/pages/admin-page/admin-page/admin-page.component';
import { UserConfirmComponent } from '../app/pages/user-confirm/user-confirm/user-confirm.component';


const routes: Routes = [
{ path: '', component: LoginPageComponent},
{ path: 'register', component: RegisterPageComponent },
{ path: 'admin', canActivate: [AdminGuard], component: AdminPageComponent },
{path: 'user-confirm/:token', component: UserConfirmComponent},
{path: 'forgot-password', component: ForgotPasswordComponent},
{path: 'recover-password/:token', component: RecoverPasswordComponent},
{path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
