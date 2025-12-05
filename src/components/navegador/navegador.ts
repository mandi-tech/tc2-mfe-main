import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [CommonModule, NzDividerModule],
  templateUrl: './navegador.html',
  styleUrls: ['./navegador.scss'],
})
export class Navegador {
  constructor(private router: Router) {}
  navigateToHome() {}
}
