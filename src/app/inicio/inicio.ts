import { Component, OnInit } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Navegador } from '../../components/navegador/navegador';
import { SaldoContainerComponent } from '../../components/saldo-container/saldo-container.component';
import { NovaTransacao } from '../../components/nova-transacao/nova-transacao';
import { ListaExtrato } from '../../components/lista-extrato/lista-extrato';
import { GraficoTransacao } from '../../components/grafico-transacao/grafico-transacao';
import { Account } from '../../services/account/account';
import { FilterPeriod } from '../../models/account.interface';
import { ButtonComponent } from '../../components/shared/button/button.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    Topbar,
    Navegador,
    SaldoContainerComponent,
    NovaTransacao,
    ListaExtrato,
    GraficoTransacao,
    ButtonComponent,
  ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss', '../app.scss'],
})
export class Inicio implements OnInit {
  filterSelected: FilterPeriod = 'all';

  constructor(private accountService: Account) {}

  ngOnInit() {
    const accountId = localStorage.getItem('account_id');
    if (accountId) {
      this.accountService.getAccountExtract(accountId).subscribe();
    }
  }

  changeFilter(period: FilterPeriod) {
    this.filterSelected = period;
    this.accountService.applyFilter(period);
  }
}
