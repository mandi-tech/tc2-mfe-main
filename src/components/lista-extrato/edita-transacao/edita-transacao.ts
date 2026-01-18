import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from '../../shared/input/input.component';
import { SelectComponent } from '../../shared/select/select.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Transaction, EditTransactionBody } from '../../../models/transaction.interface';
import { palette } from '../../../constants/colors';
import { Upload } from '../../shared/upload/upload';

@Component({
  selector: 'app-edit-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    Upload,
  ],
  templateUrl: './edita-transacao.html',
  styleUrl: './edita-transacao.scss',
})
export class EditTransactionDialog {
  value: number;
  urlAnexo: string;
  anexo: string;
  type: string;
  tempFile: any = null;

  tiposDeTransacao: { value: string; label: string }[] = [
    { value: 'Debit', label: 'Débito' },
    { value: 'Credit', label: 'Crédito' },
  ];
  public palette = palette;

  constructor(
    public dialogRef: MatDialogRef<EditTransactionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction
  ) {
    this.value = data.value;
    this.urlAnexo = data.urlAnexo;
    this.anexo = data.anexo || '';
    this.type = data.type;
  }

  handleFileUpload(fileData: { name: string; url: string }) {
    if (fileData) {
      this.anexo = fileData.name;
      this.urlAnexo = fileData.url;
    }
  }

  save() {
    const result: EditTransactionBody = {
      value: this.value,
      urlAnexo: this.urlAnexo,
      anexo: this.anexo,
      type: this.type as any,
    };
    this.dialogRef.close(result);
  }

  cancel() {
    this.dialogRef.close();
  }
}
