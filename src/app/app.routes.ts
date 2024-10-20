import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessageGeneratorComponent } from './components/message-generator/message-generator.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota raiz para HomeComponent
  { path: 'messages', component: MessageGeneratorComponent },
  // Adicione outras rotas conforme necessário
];
