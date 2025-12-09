import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../../services/account/account';
import { TransactionBody } from '../../models/transaction.interface';

@Component({
  selector: 'app-nova-transacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nova-transacao.html',
  styleUrl: './nova-transacao.scss',
})
export class NovaTransacao {
  anexo: string = '';
  value: number = 0;
  urlAnexo: string = '';
  type: string = '';
  errorMessage: string | null = null;

  tiposDeTransacao: { value: string; label: string }[] = [
    { value: 'Debit', label: 'Débito' },
    { value: 'Credit', label: 'Crédito' },
  ];

  constructor(private accountService: Account) {}

  novaTransacao() {
    this.errorMessage = null; // Limpa erros anteriores

    // 1. Obter accountId do localStorage
    const accountId = typeof window !== 'undefined' ? localStorage.getItem('account_id') : null;

    // 2. Validação: accountId e value
    if (!accountId) {
      this.errorMessage = 'Erro: ID da conta não encontrado. Faça login novamente.';
      console.error(this.errorMessage);
      return;
    }

    if (this.value <= 0) {
      this.errorMessage = 'O valor da transação deve ser maior que zero (0).';
      return;
    }

    // 3. Montar o corpo da transação (TransactionBody)
    const transactionBody: TransactionBody = {
      accountId: accountId, // Garantido como string
      type: this.type as any, // 'Debit' | 'Credit'
      value: this.value,
      anexo: this.anexo,
      urlAnexo: this.urlAnexo,
    };

    // 4. Chamar o serviço
    this.accountService.postAccountTransaction(transactionBody).subscribe({
      next: (response) => {
        alert('Transação criada com sucesso!');
        console.log('Transação enviada:', response);
        // Opcional: Limpar formulário ou redirecionar
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = 'Falha ao processar a transação. Tente novamente.';
        console.error('Erro ao postar transação:', err);
      },
    });
  }

  private resetForm() {
    this.anexo = '';
    this.value = 0;
    this.urlAnexo = '';
    this.type = 'Debit';
  }
}
