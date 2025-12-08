import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    // DEBUG: Confirma que o interceptor está sendo acionado
    console.log('*** TokenInterceptor acionado para URL:', req.url);

    if (token) {
      console.log('Token presente. Clona a requisição e adiciona o header.');
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }

    console.log('Token não encontrado ou nulo. Passando requisição original.');
    return next.handle(req);
  }
}
