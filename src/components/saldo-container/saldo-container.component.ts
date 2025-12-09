import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account } from '../../services/account/account';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saldo-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo-container.component.html',
  styleUrl: './saldo-container.component.scss',
})
export class SaldoContainerComponent implements OnInit, OnDestroy {
  public isSaldoVisible: boolean = true;
  public firstName: string | null = null;

  private storageListener = (event: StorageEvent) => {
    if (event.key === 'auth_token') {
      this.updateFirstNameFromToken();
    }
  };

  //TODO: Substituir valor fixo pelo valor real do saldo do usuário retornado pela rota
  public saldo: string = 'R$ 0,00';
  private accountId: string | null =
    typeof window !== 'undefined' ? localStorage.getItem('account_id') : null;
  private transactionSubscription: Subscription | null = null;

  constructor(private accountService: Account) {}

  ngOnInit(): void {
    this.updateFirstNameFromToken();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.storageListener);

      if (this.accountId) {
        this.updateAccountBalance();
      } else {
        this.accountService.getAccount().subscribe({
          next: (response: any) => {
            this.accountId = response.result.account[0].id;
            localStorage.setItem('account_id', this.accountId!);
            this.updateAccountBalance();
          },
          error: (error) => {
            console.error('Error fetching account data:', error);
          },
        });
      }

      // Subscribe to transaction updates
      this.transactionSubscription = this.accountService.transactionsUpdated$.subscribe(() => {
        this.updateAccountBalance();
      });
    }
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.storageListener);
    }
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  private updateFirstNameFromToken(): void {
    try {
      const storedFirstName =
        typeof window !== 'undefined' ? localStorage.getItem('first_name') : null;

      if (storedFirstName) {
        this.firstName = storedFirstName;
      } else {
        this.firstName = null;
      }
    } catch (e) {
      this.firstName = null;
    }
  }

  private updateAccountBalance(): void {
    try {
      if (this.accountId) {
        this.accountService.getAccountExtract(this.accountId as string).subscribe({
          next: (response: any) => {
            const saldoInicial = 5250;
            const totalDebitos = response.result.transactions.reduce(
              (acc: number, transaction: any) => acc - transaction.value,
              0
            );
            this.saldo = (saldoInicial - totalDebitos).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });
          },
          error: (error) => {
            console.error('Error fetching account extract:', error);
          },
        });
      }
    } catch (e) {}
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
}
