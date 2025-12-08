import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSaldoTotal } from '../../store/transacao.selector';
import { Account } from '../../services/account/account';
import { carregarTransacoes } from '../../store/transacao.actions';

@Component({
  selector: 'app-saldo-container',
  templateUrl: './saldo-container.component.html',
  styleUrl: './saldo-container.component.scss',
})
export class SaldoContainerComponent implements OnInit {
  public isSaldoVisible: boolean = true;
  public saldo: number = 2500;

  constructor(private accountService: Account) {}

  ngOnInit() {
    this.accountService.getAccount().subscribe((resp) => {
      const transacoes = resp?.result?.transactions || [];
      if (transacoes.length === 0) {
        this.saldo = 2500;
      } else {
        const totalOut = transacoes.reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        this.saldo = Number((2500 - totalOut).toFixed(2));
      }
    });
  }
}
