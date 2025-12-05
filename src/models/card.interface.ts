import { TipoTransacao } from './tipo_transacao.enum';

export interface Card {
  id: string;
  accountId: string;
  type: TipoTransacao;
  is_blocked: boolean;
  number: string;
  dueDate: string;
  functions: string;
  cvc: string;
  paymentDate: string;
  name: string;
}
