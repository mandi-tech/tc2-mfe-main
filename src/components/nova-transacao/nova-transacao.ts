import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nova-transacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nova-transacao.html',
  styleUrl: './nova-transacao.scss',
})
export class NovaTransacao {
  email = '';
  password = '';
  loading = false;

  novaTransacao() {}
}
