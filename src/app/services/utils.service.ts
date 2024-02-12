import { Inject, Injectable, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  router = inject(Router)

  routerLink(url:string){
    return this.router.navigateByUrl(url)
  }
  saveInLocalStorage(key:string, value:any){
    return localStorage.setItem(key,JSON.stringify(value))
  }
  getFromLocalStorage(key: string){
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null; 
  }
}
