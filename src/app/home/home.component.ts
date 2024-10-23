// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DevelopmentModalComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  features = [
    {
      icon: 'calendar_today',
      title: 'Calendário de Amor',
      description: 'Marque todas as datas especiais do seu relacionamento.',
      link: '/calendar'
    },
    {
      icon: 'chat',
      title: 'Gerador de Mensagens',
      description: 'Use nossa IA para criar mensagens românticas personalizadas.',
      link: '/messages'
    }
  ];

  openDevelopmentModal() {
    this.dialog.open(DevelopmentModalComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });
  }
}
