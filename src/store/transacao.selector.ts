import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransacaoState } from './transacao.reducer';

export const selectTransacaoState = createFeatureSelector<TransacaoState>('transacao');

export const selectSaldoTotal = createSelector(selectTransacaoState, (state: TransacaoState) => {
  const { transacoes } = state;
  const INITIAL_SALDO = 2500;

  if (!transacoes || transacoes.length === 0) {
    return INITIAL_SALDO;
  }

  const totalOut = transacoes.reduce((acc, t) => {
    const value = typeof t.value === 'number' ? t.value : Number(t.value) || 0;
    return acc + value;
  }, 0);

  const saldo = INITIAL_SALDO - totalOut;

  return Number(saldo.toFixed(2));
});
