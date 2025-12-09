import { Component } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Navegador } from '../../components/navegador/navegador';
import { SaldoContainerComponent } from '../../components/saldo-container/saldo-container.component';
import { NovaTransacao } from '../../components/nova-transacao/nova-transacao';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Topbar, Navegador, SaldoContainerComponent, NovaTransacao],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss', '../app.scss'],
})
export class Inicio {}
