
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from '../app/pages/error-page/error-page/error-page.component';
import { ForgotPasswordComponent } from '../app/pages/forgot-password/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '../app/pages/recover-password/recover-password/recover-password.component';
import { RegisterPageComponent } from '../app/pages/register-page/register-page.component';
import { LoginPageComponent } from '../app/pages/login-page/login-page.component';
import { AdminPageComponent } from '../app/pages/admin-page/admin-page/admin-page.component';
import { UserConfirmComponent } from '../app/pages/user-confirm/user-confirm/user-confirm.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AdminPageComponent,
    UserConfirmComponent,
    ErrorPageComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
