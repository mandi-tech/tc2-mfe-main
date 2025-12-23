import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { getUsernameFromToken } from '../../utils/auth.utils';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss'],
})
export class Topbar implements OnInit, OnDestroy {
  username: string | null = null;
  constructor(private router: Router) {}

  private storageListener = (event: StorageEvent) => {
    if (event.key === 'auth_token') {
      this.updateUsernameFromToken();
    }
  };

  ngOnInit(): void {
    this.updateUsernameFromToken();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.storageListener);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.storageListener);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_response');
      } catch (e) {
        // ignora
      }
      this.username = null;
      // navega para a rota de login
      try {
        this.router.navigate(['/login']);
      } catch (e) {
        // fallback
        window.location.href = '/login';
      }
    }
  }

  private updateUsernameFromToken(): void {
    this.username = getUsernameFromToken();
  }
}
