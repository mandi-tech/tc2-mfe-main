import { Card } from './card.interface';
import { TipoTransacao } from './tipo_transacao.enum';
import { Transaction } from './transaction.interface';

export interface Account {
  id: string;
  type: TipoTransacao;
  userId: string;
}

export interface GetAccountResp {
  message: string;
  result: {
    account: Account[];
    transactions: Transaction[];
    cards: Card[];
  };
}
