import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Account } from '../../services/account/account';
import { saldoInicial } from '../../models/account.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-transacao',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './grafico-transacao.html',
  styleUrl: './grafico-transacao.scss',
})
export class GraficoTransacao implements OnInit, OnDestroy {
  private sub: Subscription | null = null;
  private saldoInicialPadrao = saldoInicial;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Saldo Acumulado (R$)',
        fill: true,
        tension: 0.3,
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        pointBackgroundColor: '#1B5E20',
        pointRadius: 4,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
    scales: {
      y: {
        beginAtZero: false,
        ticks: { callback: (value) => `R$ ${value}` },
      },
    },
  };

  constructor(private accountService: Account) {}

  ngOnInit(): void {
    this.sub = this.accountService.transactions$.subscribe((response) => {
      if (response && response.result.transactions) {
        this.calcularEvolucaoSaldo(response.result.transactions);
      }
    });
  }

  private calcularEvolucaoSaldo(transactions: any[]): void {
    if (!transactions || transactions.length === 0) return;

    const transacoesOrdenadas = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let saldoAtual = this.saldoInicialPadrao;
    const labels: (string | string[])[] = [];
    const historicoSaldo: number[] = [];

    transacoesOrdenadas.forEach((t) => {
      const dataObj = new Date(t.date);

      const dataRef = dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      });

      const horaRef = dataObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      labels.push([horaRef, dataRef]);

      saldoAtual += t.value;
      historicoSaldo.push(saldoAtual);
    });

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: historicoSaldo,
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
