import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { transacaoReducer } from '../store/transacao.reducer';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from '../services/auth/auth.interceptor';
import { NovaTransacao } from '../components/nova-transacao/nova-transacao';
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ transacao: transacaoReducer }),
    HttpClient,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
