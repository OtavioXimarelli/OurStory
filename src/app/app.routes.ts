import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota raiz para HomeComponent
  { path: 'messages', component: MessagesComponent },
  // Adicione outras rotas conforme necessário
];
