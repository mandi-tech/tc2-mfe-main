import { Component } from '@angular/core';

@Component({
  selector: 'app-saldo-container',
  standalone: true,
  imports: [],
  templateUrl: './saldo-container.component.html',
  styleUrl: './saldo-container.component.scss',
})
export class SaldoContainerComponent {
  public isSaldoVisible: boolean = true;

  //TODO: Substituir valor fixo pelo valor real do saldo do usuário retornado pela rota
  private readonly saldo: string = 'R$ 5.250,00';

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
