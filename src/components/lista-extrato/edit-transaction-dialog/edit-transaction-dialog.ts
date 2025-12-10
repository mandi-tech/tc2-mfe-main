import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from '../../shared/input/input.component';
import { SelectComponent } from '../../shared/select/select.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Transaction, EditTransactionBody } from '../../../models/transaction.interface';

@Component({
  selector: 'app-edit-transaction-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, InputComponent, SelectComponent, ButtonComponent],
  templateUrl: './edit-transaction-dialog.html',
  styles: [`
    .dialog-container {
      padding: 24px;
      min-width: 400px;
    }
    .form-group {
        margin-bottom: 16px;
    }
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 24px;
    }
  `]
})
export class EditTransactionDialog {
  value: number;
  urlAnexo: string;
  type: string;

  tiposDeTransacao: { value: string; label: string }[] = [
    { value: 'Debit', label: 'Débito' },
    { value: 'Credit', label: 'Crédito' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditTransactionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction
  ) {
    this.value = data.value;
    this.urlAnexo = data.urlAnexo;
    this.type = data.type;
  }

  save() {
    const result: EditTransactionBody = {
      value: this.value,
      urlAnexo: this.urlAnexo,
      type: this.type as any
    };
    this.dialogRef.close(result);
  }

  cancel() {
    this.dialogRef.close();
  }
}
