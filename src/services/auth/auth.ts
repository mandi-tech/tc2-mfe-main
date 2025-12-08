import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  getToken(): string | null {
    // Deve ser a mesma chave usada para salvar no login.ts
    const token = localStorage.getItem('auth_token');

    // DEBUG: Adicione um log aqui para confirmar se o main-app está vendo o token
    // Quando uma requisição é feita, este log deve aparecer no console
    console.log(
      'Auth Service (main-app) - Token retornado para Interceptor:',
      token ? 'Token presente' : 'Token ausente'
    );

    return token;
  }
}
