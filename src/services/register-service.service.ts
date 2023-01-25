import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) {

  }


  registerPost(formValues: any): Observable<any> {
    return this.http.post("http://localhost:8084/api/users/register", formValues)

  }
  loginPost(loginValues: any): Observable<any> {
    return this.http.post("http://localhost:8084/api/users/login", loginValues)
  }
  logOut(token: string){
    return this.http.post("http://localhost:8084/api/users/logout", token)
  }
  verifyEmail(): Observable<any> {
    return this.http.get(`https://dlab.typsa.net/users/api/mail`);
  }
  userConfirm(token: string){
    return this.http.get(`http://localhost:8084/api/users/confirmar-usuario/${token}`);
  }
  assignPermit(user: any){
    return this.http.post(`https://dlab.typsa.net/users/api/mail`, user);
  }
  sendEmailToRecoveryPass(email: any){
    return this.http.post("http://localhost:8084/api/users/olvide-password", email)
  }
  sendPassToUpdate(pass:any, token:string){
    return this.http.post(`http://localhost:8084/api/users/nuevo-password/${token}`, pass)
  }
  verifyToken(token: string){
    return this.http.get(`http://localhost:8084/api/users/olvide-password/${token}`)
  }
 verifyAdminByEmail(email: string){
    return this.http.get(`http://localhost:8084/api/users/verify-admin/${email}`)

 }

}
