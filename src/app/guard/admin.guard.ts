import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
import { RegisterServiceService } from 'src/services/register-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public router: Router, public registerService: RegisterServiceService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const email = localStorage.getItem("emailMontenegro")
     return this.registerService.verifyAdminByEmail(email!).pipe(
        map((user:any) => {
          if(user === null){
            this.router.navigate(['login'])
            return false
          }
           if(user.confirmed && user.isAdmin){
               return true
           }else{
            this.router.navigate([''])
            return false
           }
        })
      )



  }



}
