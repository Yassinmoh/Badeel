import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  router: Router = inject(Router)
  private JWT_TOKEN: string = 'JWT_TOKEN'
  private REFRESH_TOKEN: string = 'REFRESH_TOKEN'
  private userAuthenticated = new BehaviorSubject<boolean>(false)
  private currentLoginUser = new BehaviorSubject<string | null>(null)

  constructor() { }

  login(data: { email: string, password: string }) {
    // Use RapidAPI Authentication:
    const options = {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': `${environment.RapidAPIConfig.apiKey}`,
        'X-RapidAPI-Host': `jwt-bearer-auth1.p.rapidapi.com`
      }
    }
    this.http.post(`${environment.RapidAPIConfig.baseAPI}${'/login'}`, data, options).pipe(
      tap((res: any) => {
        this.REFRESH_TOKEN = res.refreshToken
        this.storeToken(res.token)
        this.userAuthenticated.next(true)
        this.currentLoginUser.next(data.email)
        this.getUserName()
        this.redirectUser()
      }),
      catchError(err => throwError(err.message))
    ).subscribe()
  }

  private storeToken(jwt: string) {
    localStorage.setItem('token', jwt)
  }

  getUserName() {
    let text = this.currentLoginUser.getValue();
    console.log(text?.split('@')[0]);
    return text?.split('@')[0]
  }

  private redirectUser() {
    this.router.navigate(['dashboard'])
  }

  logOut() {
    localStorage.removeItem(this.JWT_TOKEN)
    this.userAuthenticated.next(false)
    this.currentLoginUser.next(null)
    this.router.navigate(['dashboard/login'])
  }

  getUserLoginStatus() {
    return this.userAuthenticated.getValue()
  }

}
