import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account/account';
import { TransactionBody } from '../../models/transaction.interface';
import { InputComponent } from '../shared/input/input.component';
import { SelectComponent } from '../shared/select/select.component';
import { ButtonComponent } from '../shared/button/button.component';
import { palette } from '../../constants/colors';

@Component({
  selector: 'app-nova-transacao',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, SelectComponent, ButtonComponent],
  templateUrl: './nova-transacao.html',
  styleUrl: './nova-transacao.scss',
})
export class NovaTransacao {
  anexo: string = '';
  value: number = 0;
  urlAnexo: string = '';
  type: string = '';
  errorMessage: string | null = null;

  public palette = palette;

  tiposDeTransacao: { value: string; label: string }[] = [
    { value: 'Debit', label: 'Débito' },
    { value: 'Credit', label: 'Crédito' },
  ];

  get isFormInvalid(): boolean {
    return !this.type || !this.value || this.value <= 0;
  }

  constructor(private accountService: AccountService) {}

  novaTransacao() {
    this.errorMessage = null;

    const accountId = typeof window !== 'undefined' ? localStorage.getItem('account_id') : null;

    if (!accountId) {
      this.errorMessage = 'Erro: ID da conta não encontrado. Faça login novamente.';
      console.error(this.errorMessage);
      return;
    }

    if (this.value <= 0) {
      this.errorMessage = 'O valor da transação deve ser maior que zero (0).';
      return;
    }

    const transactionBody: TransactionBody = {
      accountId: accountId,
      type: this.type as any,
      value: this.value,
      anexo: this.anexo,
      urlAnexo: this.urlAnexo,
    };

    this.accountService.postAccountTransaction(transactionBody).subscribe({
      next: (response) => {
        alert('Transação criada com sucesso!');
        console.log('Transação enviada:', response);
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
    this.type = '';
  }
}
