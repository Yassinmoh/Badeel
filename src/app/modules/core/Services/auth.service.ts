import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  router: Router = inject(Router)
  private JWT_TOKEN: string = 'JWT_TOKEN'
  private REFRESH_TOKEN: string = 'REFRESH_TOKEN'
  private OPTIONS = environment.RapidAPIConfig.OPTIONS
  private userAuthenticated = new BehaviorSubject<boolean>(false)
  private currentLoginUser = new BehaviorSubject<string | null>(null)


  constructor() { }

  login(data: { email: string, password: string }) {
    // Use RapidAPI Authentication:

    this.http.post(`${environment.RapidAPIConfig.BASE_API}${'/login'}`, data, this.OPTIONS).pipe(
      tap((res: any) => {
        this.REFRESH_TOKEN = res.refreshToken
        this.storeToken(res)
        this.userAuthenticated.next(true)
        this.currentLoginUser.next(data.email)
        this.getUserName()
        this.redirectUser()
      }),
      catchError(err => throwError(err.message))
    ).subscribe()
  }

  private storeToken(jwt: any) {
    localStorage.setItem('token', jwt.token)
    localStorage.setItem('refresh', jwt.refreshToken)
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

  isTokenExpired() {
    let token = localStorage.getItem('JWT_TOKEN')
    if (!token) return;
    let decode = jwtDecode(token)
    if (!decode.exp) return;
    let expireDate = decode.exp * 1000;
    let now = new Date().getTime()
    return expireDate < now
  }

  refreshToken() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh');
    if (!token || !refreshToken) return;
    this.http.post(`${environment.RapidAPIConfig.BASE_API}${'/refresh'}`,
      { token, refreshToken },
      this.OPTIONS).pipe(
        tap(tokens => this.storeToken(tokens))
      ).subscribe()
  }

}
