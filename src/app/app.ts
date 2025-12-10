import { Component, signal } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('main-app');
}
