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
import { MatSelectModule } from '@angular/material/select';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';

interface GeneratedMessage {
  text: string;
  date: string;
  category: string;
  rating?: number;
  isFavorite?: boolean;
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
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule
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
  messageCategory: string = '';
  charCount: number = 0;
  editingMessage: GeneratedMessage | null = null;

  constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) {}

  ngOnInit() {
    const savedMessages = JSON.parse(localStorage.getItem('generatedMessages') || '[]');
    this.generatedMessages = savedMessages;
  }

  updateCharCount() {
    this.charCount = this.additionalInfo.length;
  }

  async handleGenerateMessage() {
    if (!this.partnerName || !this.messageCategory) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }
    this.loading = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const message = `Mensagem ${this.messageCategory} gerada para ${this.partnerName}. ${this.additionalInfo}`;
      const timestamp = new Date().toLocaleString();
      const newMessage = { text: message, date: timestamp, category: this.messageCategory };
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
      this.messageCategory = '';
      this.charCount = 0;
    }
  }

  saveMessages() {
    localStorage.setItem('generatedMessages', JSON.stringify(this.generatedMessages));
  }

  handleClearMessages() {
    this.generatedMessages = [];
    this.saveMessages();
    this.snackBar.open('Histórico de mensagens limpo!', 'Fechar', { duration: 3000 });
  }

  editMessage(message: GeneratedMessage) {
    this.editingMessage = { ...message };
  }

  saveEditedMessage() {
    if (!this.editedMessage?.trim()) {
      return;
    }
    if (this.editingMessage) {
      const index = this.generatedMessages.findIndex(m => m.date === this.editingMessage!.date);
      if (index !== -1) {
        this.generatedMessages[index] = this.editingMessage;
        this.saveMessages();
        this.editingMessage = null;
        this.snackBar.open('Mensagem atualizada com sucesso!', 'Fechar', { duration: 3000 });
      }
    }
  }

  copyToClipboard(message: string) {
    this.clipboard.copy(message);
    this.snackBar.open('Mensagem copiada para a área de transferência!', 'Fechar', { duration: 3000 });
  }

  rateMessage(message: GeneratedMessage, rating: number) {
    message.rating = rating;
    this.saveMessages();
    this.snackBar.open('Obrigado pela sua avaliação!', 'Fechar', { duration: 3000 });
  }

  async shareMessage(message: string) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mensagem Mágica',
          text: message,
          url: window.location.href
        });
        this.snackBar.open('Mensagem compartilhada com sucesso!', 'Fechar', { duration: 3000 });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        this.snackBar.open('Erro ao compartilhar a mensagem.', 'Fechar', { duration: 3000 });
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      this.snackBar.open('Compartilhamento não suportado neste navegador.', 'Fechar', { duration: 3000 });
    }
  }

  toggleFavorite(message: GeneratedMessage) {
    message.isFavorite = !message.isFavorite;
    this.saveMessages();
    const action = message.isFavorite ? 'adicionada aos' : 'removida dos';
    this.snackBar.open(`Mensagem ${action} favoritos!`, 'Fechar', { duration: 3000 });
  }
}
