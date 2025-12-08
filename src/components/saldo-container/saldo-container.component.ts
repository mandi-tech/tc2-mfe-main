import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-saldo-container',
  standalone: true,
  imports: [],
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
  private readonly saldo: string = 'R$ 5.250,00';

  constructor() {}

  ngOnInit(): void {
    this.updateFirstNameFromToken();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.storageListener);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.storageListener);
    }
  }

  private updateFirstNameFromToken(): void {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) {
        this.firstName = null;
        return;
      }
      const parts = token.split('.');
      if (parts.length < 2) {
        this.firstName = null;
        return;
      }
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(payload)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const data = JSON.parse(json);
      const fullName = data?.username || data?.name || null;
      if (fullName && typeof fullName === 'string') {
        this.firstName = fullName.split(' ')[0];
      } else {
        this.firstName = null;
      }
    } catch (e) {
      this.firstName = null;
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
}
