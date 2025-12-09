import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { GetAccountResp } from '../../models/account.interface';
import {
  EditTransactionBody,
  GetTransactionsResp,
  PostTransactionResp,
  TransactionBody,
} from '../../models/transaction.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Account {
  private apiUrl = environment.apiUrl + 'account';

  private http = inject(HttpClient);

  private transactionsUpdated = new Subject<void>();
  public transactionsUpdated$ = this.transactionsUpdated.asObservable();

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }

  getAccount(options?: { headers?: Record<string, string> }) {
    const headers = { ...this.getAuthHeaders(), ...options?.headers };
    return this.http.get<GetAccountResp>(`${this.apiUrl}`, { headers });
  }

  postAccountTransaction(transactionData: TransactionBody) {
    const headers = this.getAuthHeaders();
    return this.http
      .post<PostTransactionResp>(`${this.apiUrl}/transaction`, transactionData, {
        headers,
      })
      .pipe(tap(() => this.transactionsUpdated.next()));
  }

  putAccountTransaction(transactionId: string, transactionData: EditTransactionBody) {
    const headers = this.getAuthHeaders();
    return this.http
      .put<PostTransactionResp>(
        `${this.apiUrl}/transaction/${transactionId}`,
        transactionData,
        { headers }
      )
      .pipe(tap(() => this.transactionsUpdated.next()));
  }

  deleteAccountTransaction(transactionId: string) {
    const headers = this.getAuthHeaders();
    return this.http
      .delete(`${this.apiUrl}/transaction/${transactionId}`, { headers })
      .pipe(tap(() => this.transactionsUpdated.next()));
  }

  getAccountExtract(accountId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get<GetTransactionsResp>(`${this.apiUrl}/${accountId}/statement`, { headers });
  }
}
