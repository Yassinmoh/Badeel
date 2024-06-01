import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let jwt = getUserToken()
  if(jwt){
    let optiosn = req.clone({
      setHeaders:{
        Authorization: 'Bearer ' + jwt
      }
    })
    return next(optiosn)
  }
  return next(req);
};

function getUserToken(){
  return localStorage.getItem('token');
}
