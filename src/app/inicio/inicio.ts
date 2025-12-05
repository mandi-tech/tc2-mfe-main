import { Component } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Navegador } from '../../components/navegador/navegador';
import { SaldoContainerComponent } from '../../components/saldo-container/saldo-container.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Topbar, Navegador, SaldoContainerComponent],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss', '../app.scss'],
})
export class Inicio {}
