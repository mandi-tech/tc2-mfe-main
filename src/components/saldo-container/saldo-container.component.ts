import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account/account';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { saldoInicial } from '../../models/account.interface';
import { getUsernameFromToken } from '../../utils/auth.utils';
import { palette } from '../../constants/colors';

@Component({
  selector: 'app-saldo-container',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './saldo-container.component.html',
  styleUrl: './saldo-container.component.scss',
})
export class SaldoContainerComponent implements OnInit, OnDestroy {
  public isSaldoVisible: boolean = true;
  public firstName: string | null = null;

  public saldo: string = 'R$ 0,00';
  public currentDate: Date = new Date();
  private transactionSubscription: Subscription | null = null;

  public palette = palette;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.firstName = getUsernameFromToken();

    this.accountService.transactions$.subscribe((response) => {
      if (response) {
        const saldoInicialPadrao = saldoInicial;
        const totalDebitos = response.result.transactions.reduce(
          (acc: number, transaction: any) => acc + transaction.value,
          0
        );
        this.saldo = (saldoInicialPadrao + totalDebitos).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  public toggleSaldoVisibility(): void {
    this.isSaldoVisible = !this.isSaldoVisible;
  }

  public get saldoDisplay(): string {
    return this.isSaldoVisible ? this.saldo : 'R$ •••••••';
  }

  public get iconDisplay(): string {
    return this.isSaldoVisible ? 'eye' : 'eye-invisible';
  }

  get dataFormatada(): string {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(this.currentDate);
  }
}
