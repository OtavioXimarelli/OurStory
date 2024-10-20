import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-message-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCardModule, MatListModule],
  templateUrl: './message-generator.component.html',
  styleUrls: ['./message-generator.component.scss']
})
export class MessageGeneratorComponent implements OnInit {
  partnerName: string = '';
  additionalInfo: string = '';
  generatedMessages: { text: string, date: string }[] = [];
  loading: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const savedMessages = JSON.parse(localStorage.getItem('generatedMessages') || '[]');
    this.generatedMessages = savedMessages;
  }

  async handleGenerateMessage() {
    if (!this.partnerName) {
      this.snackBar.open('Por favor, preencha o nome do parceiro.', 'Fechar', { duration: 3000 });
      return;
    }
    this.loading = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const message = `Mensagem romântica gerada para ${this.partnerName}. ${this.additionalInfo}`;
      const timestamp = new Date().toLocaleString();
      const newMessage = { text: message, date: timestamp };
      this.generatedMessages = [newMessage, ...this.generatedMessages.slice(0, 4)];
      localStorage.setItem('generatedMessages', JSON.stringify(this.generatedMessages));
      this.snackBar.open('Mensagem gerada com sucesso!', 'Fechar', { duration: 3000 });
    } catch (error) {
      console.error("Erro ao gerar mensagem:", error);
      this.snackBar.open('Erro ao gerar mensagem. Tente novamente.', 'Fechar', { duration: 3000 });
    } finally {
      this.loading = false;
      this.partnerName = '';
      this
    }
  }

  handleClearMessages() {
    this.generatedMessages = [];
    localStorage.removeItem('generatedMessages');
    this.snackBar.open('Mensagens limpas com sucesso!', 'Fechar', { duration: 3000 });
  }
}
