import { TipoTransacao } from './tipo_transacao.enum';

export interface TransactionBody {
  accountId: string;
  type: TipoTransacao;
  value: number;
  anexo: string;
  urlAnexo: string;
}

export interface Transaction extends TransactionBody {
  id: string;
  date: string;
}

export interface PostTransactionResp {
  message: string;
  result: Transaction;
}

export interface GetTransactionsResp {
  message: string;
  result: { transactions: Transaction[] };
}

export interface EditTransactionBody {
  type: TipoTransacao;
  value: number;
  urlAnexo: string;
  anexo: string;
}
