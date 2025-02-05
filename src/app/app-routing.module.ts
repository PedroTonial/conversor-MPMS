import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelConversaoComponent } from './pages/painel-conversao/painel-conversao.component';
import { HistoricoComponent } from './pages/historico/historico.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PainelConversaoComponent },
  { path: 'historico', component: HistoricoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
