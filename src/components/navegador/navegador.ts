import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './navegador.html',
  styleUrls: ['./navegador.scss'],
})
export class Navegador {
  constructor(private router: Router) {}
  navigateToHome() {}
}
