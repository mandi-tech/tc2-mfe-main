import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.interface';

export const adicionarTransacao = createAction(
  '[Transacao] Adicionar Transacao',
  props<{ transacao: Transaction }>()
);

export const carregarTransacoes = createAction(
  '[Transacao] Carregar Transacoes',
  props<{ transacoes: Transaction[] }>()
);
