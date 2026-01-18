import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../services/account/account';
import { Transaction } from '../../models/transaction.interface';
import { EditTransactionDialog } from './edita-transacao/edita-transacao';
import { Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { palette } from '../../constants/colors';
@Component({
  selector: 'app-lista-extrato',
  standalone: true,
  imports: [CommonModule, DatePipe, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './lista-extrato.html',
  styleUrl: './lista-extrato.scss',
})
export class ListaExtrato implements OnInit, OnDestroy {
  public palette = palette;

  transactions: Transaction[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  transactionsSubscription!: Subscription;

  constructor(private accountService: AccountService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.accountService.transactions$.subscribe((response) => {
      if (response) {
        this.transactions = response.result.transactions || [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
  }

  fetchTransactions() {
    const accountId = typeof window !== 'undefined' ? localStorage.getItem('account_id') : null;
    if (accountId) {
      this.accountService.getAccountExtract(accountId).subscribe({
        next: (response) => {
          this.transactions = response.result.transactions || [];
        },
        error: (err) => {
          console.error('Erro ao buscar extrato', err);
        },
      });
    }
  }

  translateType(type: string): string {
    const translations: { [key: string]: string } = {
      Debit: 'Débito',
      Credit: 'Crédito',
    };
    return translations[type] || type;
  }

  deleteTransaction(id: string) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.accountService.deleteAccountTransaction(id).subscribe({
        next: () => {
          console.log('Transação excluída com sucesso');
        },
        error: (err) => {
          alert('Erro ao excluir transação');
          console.error(err);
        },
      });
    }
  }

  editTransaction(transaction: Transaction) {
    const dialogRef = this.dialog.open(EditTransactionDialog, {
      data: transaction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accountService.putAccountTransaction(transaction.id, result).subscribe({
          next: () => {
            console.log('Transação editada com sucesso');
          },
          error: (err) => {
            console.error('Erro ao editar transação', err);
            alert('Erro ao editar transação');
          },
        });
      }
    });
  }

  get pagedTransactions(): Transaction[] {
    const allReversed = [...this.transactions].reverse();
    const startIndex = this.pageIndex * this.pageSize;
    return allReversed.slice(startIndex, startIndex + this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
