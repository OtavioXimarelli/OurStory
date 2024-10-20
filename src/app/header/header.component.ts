import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Importa o CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated = false; // Simulação de autenticação

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated; // Simulação de login/logout
  }
}
