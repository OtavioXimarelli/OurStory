import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface GeneratedMessage {
  text: string;
  date: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0, transform: 'translateY(-15px)' }), stagger('50ms', animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))],
          { optional: true }
        )
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {
  partnerName: string = '';
  additionalInfo: string = '';
  generatedMessages: GeneratedMessage[] = [];
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
      this.saveMessages();
      this.snackBar.open('Mensagem gerada com sucesso!', 'Fechar', { duration: 3000 });
    } catch (error) {
      console.error("Erro ao gerar mensagem:", error);
      this.snackBar.open('Erro ao gerar mensagem. Tente novamente.', 'Fechar', { duration: 3000 });
    } finally {
      this.loading = false;
      this.partnerName = '';
      this.additionalInfo = '';
    }
  }

  handleClearMessages() {
    this.generatedMessages = [];
    localStorage.removeItem('generatedMessages');
    this.snackBar.open('Histórico de mensagens limpo.', 'Fechar', { duration: 3000 });
  }

  private saveMessages() {
    localStorage.setItem('generatedMessages', JSON.stringify(this.generatedMessages));
  }
}
