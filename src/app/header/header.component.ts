import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Importa o CommonModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated = false; // Simulação de autenticação
  menuActive = false; // Propriedade adicionada para controlar o menu

  constructor(private dialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 768 && this.menuActive) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive; // Alterna o estado do menu
    document.body.style.overflow = this.menuActive ? 'hidden' : '';
  }

  closeMenu() {
    this.menuActive = false;
    document.body.style.overflow = '';
  }

  openDevelopmentModal() {
    this.dialog.open(DevelopmentModalComponent, {
      width: '90%', // Ajuste para telas menores
      maxWidth: '400px',
      panelClass: 'custom-dialog-container'
    });
  }

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated; // Simulação de login/logout
    this.openDevelopmentModal();
  }
}

@Component({
  selector: 'app-development-modal',
  template: `
    <div class="modal-container">
      <h2 mat-dialog-title>Funcionalidade em Desenvolvimento</h2>
      <mat-dialog-content>
        <p>Esta funcionalidade está atualmente em desenvolvimento. Fique atento para atualizações futuras!</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button color="primary" mat-dialog-close>Fechar</button>
      </mat-dialog-actions>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  styles: [`
    .modal-container {
      padding: 24px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #e91e63;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #333;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    mat-dialog-actions {
      justify-content: flex-end;
    }
  `]
})
export class DevelopmentModalComponent {}
