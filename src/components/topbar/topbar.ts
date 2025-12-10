import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
    if (typeof window === 'undefined') {
      this.username = null;
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.username = null;
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length < 2) {
        this.username = null;
        return;
      }
      // base64url -> base64
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(payload)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const data = JSON.parse(json);
      this.username = data?.username || data?.name || null;
    } catch (e) {
      this.username = null;
    }
  }
}
