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
  private saldoInicialPadrao = saldoInicial; // O valor base que você definiu

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Saldo Acumulado (R$)',
        fill: true,
        tension: 0.3, // Curva mais suave para o saldo
        borderColor: '#2E7D32', // Verde para representar saldo
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
        beginAtZero: false, // Saldo pode começar alto
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
    // 1. Agrupar impacto financeiro por dia
    const impactoPorDia: { [key: string]: number } = {};

    transactions.forEach((t) => {
      const data = new Date(t.date).toLocaleDateString('pt-BR');
      // Se for Débito subtrai, se for Crédito soma
      const valor = t.value;
      impactoPorDia[data] = (impactoPorDia[data] || 0) + valor;
    });

    // 2. Ordenar datas cronologicamente
    const datasOrdenadas = Object.keys(impactoPorDia).sort((a, b) => {
      return (
        new Date(a.split('/').reverse().join('-')).getTime() -
        new Date(b.split('/').reverse().join('-')).getTime()
      );
    });

    // 3. Calcular Saldo Acumulado (Progressivo)
    let saldoAtual = this.saldoInicialPadrao;
    const historicoSaldo: number[] = [];

    datasOrdenadas.forEach((data) => {
      saldoAtual += impactoPorDia[data];
      historicoSaldo.push(saldoAtual);
    });

    // 4. Atualizar o gráfico
    this.lineChartData = {
      labels: datasOrdenadas,
      datasets: [{ ...this.lineChartData.datasets[0], data: historicoSaldo }],
    };
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
