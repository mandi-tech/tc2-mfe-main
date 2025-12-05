import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  getAccount() {
    return this.http.get<GetAccountResp>(`${this.apiUrl}`);
  }

  postAccountTransaction(transactionData: TransactionBody) {
    return this.http.post<PostTransactionResp>(`${this.apiUrl}/transaction`, transactionData);
  }

  putAccountTransaction(transactionId: string, transactionData: EditTransactionBody) {
    return this.http.put<PostTransactionResp>(
      `${this.apiUrl}/transaction/${transactionId}`,
      transactionData
    );
  }

  deleteAccountTransaction(transactionId: string) {
    return this.http.delete(`${this.apiUrl}/transaction/${transactionId}`);
  }

  getAccountExtract(accountId: string) {
    return this.http.get<GetTransactionsResp>(`${this.apiUrl}/${accountId}/statement`);
  }
}
