import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../models/transaction.interface';
import { adicionarTransacao, carregarTransacoes } from './transacao.actions';

export interface TransacaoState {
  transacoes: Transaction[];
}

export const initialTransacaoState: TransacaoState = {
  transacoes: [],
};

export const transacaoReducer = createReducer(
  initialTransacaoState,
  on(carregarTransacoes, (state, { transacoes }) => ({
    ...state,
    transacoes: [...transacoes],
  })),
  on(adicionarTransacao, (state, { transacao }) => ({
    ...state,
    transacoes: [...state.transacoes, transacao],
  }))
);

export function getSaldoTotal(transacoes: Transaction[]): number {
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
}
