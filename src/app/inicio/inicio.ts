import { Component, OnInit } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Navegador } from '../../components/navegador/navegador';
import { SaldoContainerComponent } from '../../components/saldo-container/saldo-container.component';
import { NovaTransacao } from '../../components/nova-transacao/nova-transacao';
import { ListaExtrato } from '../../components/lista-extrato/lista-extrato';
import { GraficoTransacao } from '../../components/grafico-transacao/grafico-transacao';
import { Account } from '../../services/account/account';

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
  ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss', '../app.scss'],
})
export class Inicio implements OnInit {
  constructor(private accountService: Account) {}

  ngOnInit() {
    const accountId = localStorage.getItem('account_id');
    if (accountId) {
      // Chama a rota aqui. Os componentes filhos que assinam transactions$ receberão o dado.
      this.accountService.getAccountExtract(accountId).subscribe();
    }
  }
}
