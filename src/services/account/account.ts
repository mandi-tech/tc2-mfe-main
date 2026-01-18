import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FilterPeriod, GetAccountResp } from '../../models/account.interface';
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
export class AccountService {
  private readonly apiUrl = `${environment.apiUrl}/account`;
  private http = inject(HttpClient);

  private allTransactions: any[] = [];
  private transactionsSubject = new BehaviorSubject<GetTransactionsResp | null>(null);
  public transactions$ = this.transactionsSubject.asObservable();

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }

  getAccount(options?: { headers?: Record<string, string> }) {
    const headers = { ...this.getAuthHeaders(), ...options?.headers };
    return this.http.get<GetAccountResp>(this.apiUrl, { headers });
  }

  getAccountExtract(accountId: string): Observable<GetTransactionsResp> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<GetTransactionsResp>(`${this.apiUrl}/${accountId}/statement`, { headers })
      .pipe(
        tap((response) => {
          this.allTransactions = response.result.transactions;
          this.transactionsSubject.next(response);
        })
      );
  }

  applyFilter(period: FilterPeriod) {
    const now = new Date();
    let filtered = [...this.allTransactions];

    if (period !== 'all') {
      filtered = this.allTransactions.filter((t) => {
        const tDate = new Date(t.date);
        if (period === 'today') {
          return tDate.toDateString() === now.toDateString();
        } else if (period === 'week') {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          return tDate >= sevenDaysAgo;
        } else if (period === 'month') {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          return tDate >= thirtyDaysAgo;
        }
        return true;
      });
    }

    const currentResponse = this.transactionsSubject.value;
    if (currentResponse) {
      this.transactionsSubject.next({
        ...currentResponse,
        result: { ...currentResponse.result, transactions: filtered },
      });
    }
  }

  private refreshData() {
    const accountId = localStorage.getItem('account_id');
    if (accountId) {
      this.getAccountExtract(accountId).subscribe();
    }
  }

  postAccountTransaction(transactionData: TransactionBody) {
    const headers = this.getAuthHeaders();
    return this.http
      .post<PostTransactionResp>(`${this.apiUrl}/transaction`, transactionData, { headers })
      .pipe(tap(() => this.refreshData()));
  }

  putAccountTransaction(transactionId: string, transactionData: EditTransactionBody) {
    const headers = this.getAuthHeaders();
    return this.http
      .put<PostTransactionResp>(`${this.apiUrl}/transaction/${transactionId}`, transactionData, {
        headers,
      })
      .pipe(tap(() => this.refreshData()));
  }

  deleteAccountTransaction(transactionId: string) {
    const headers = this.getAuthHeaders();
    return this.http
      .delete(`${this.apiUrl}/transaction/${transactionId}`, { headers })
      .pipe(tap(() => this.refreshData()));
  }
}
