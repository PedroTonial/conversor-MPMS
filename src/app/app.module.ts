//Ambiente
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Ambiente FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
//Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//PrimeNG UI
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
//Services
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/services/http.service';
//Componentes
import { AppComponent } from './app.component';
import { PainelConversaoComponent } from './pages/painel-conversao/painel-conversao.component';
import { ModalTaxaComponent } from './shared/components/modals/modal-taxa/modal-taxa.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { ModalDetalhesComponent } from './shared/components/modals/modal-detalhes/modal-detalhes.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
//Pipes
import { CurrencyFormatPipe } from './shared/pipes/currency-format.pipe';
@NgModule({
  declarations: [
    AppComponent,
    PainelConversaoComponent,
    ModalTaxaComponent,
    HistoricoComponent,
    ModalDetalhesComponent,
    FooterComponent,
    HeaderComponent,
    CurrencyFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    ToastModule,
    DropdownModule,
    MatPaginatorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
