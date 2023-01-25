import { RegisterServiceService } from 'src/services/register-service.service';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, public registerService: RegisterServiceService){

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean{

    const email = localStorage.getItem("emailMontenegro")
    const token = localStorage.getItem("tokenMontenegro")



    localStorage.setItem("linkMontenegro", document.location.href)

    return this.registerService.verifyAdminByEmail(email!).pipe(
       map((user:any) => {

        if(user === null){
          this.router.navigate([''])
          return false
        }
         if(user.confirmed && user.token === token){
          localStorage.removeItem("linkMontenegro")
             return true
         }else{
          this.router.navigate([''])
          return false
         }

       })

     )


  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
