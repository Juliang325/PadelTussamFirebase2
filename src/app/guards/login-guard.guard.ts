import { getAuth } from 'firebase/auth';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  firebaseSvc = inject(FirebaseService);
  UtilsSvc = inject(UtilsService) 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     let user = localStorage.getItem('user');

    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((login) => {
        if(!login) resolve(true);
          
        else{
          this.UtilsSvc.routerLink('/home');
          resolve(false);
        }
      })
    });
  }
  
}