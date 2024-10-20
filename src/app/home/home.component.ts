// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      icon: 'calendar_today',
      title: 'Calendário de Amor',
      description: 'Marque todas as datas especiais do seu relacionamento.',
      link: '/calendar'
    },
    {
      icon: 'favorite',
      title: 'Mensagens do Coração',
      description: 'Crie e compartilhe mensagens românticas para ocasiões únicas.',
      link: '/messages'
    },
    // Adicione mais funcionalidades conforme necessário
  ];
}

