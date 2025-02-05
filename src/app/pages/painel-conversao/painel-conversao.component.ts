import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaxaComponent } from '../../shared/components/modals/modal-taxa/modal-taxa.component';
import { HttpService } from '../../shared/services/http.service';
import { Transacao } from '../../shared/interfaces/transacao';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { listaMoedas, MoedasDisponiveis } from '../../shared/enums/moedasEnum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-painel-conversao',
  templateUrl: './painel-conversao.component.html',
  styleUrls: ['./painel-conversao.component.scss'],
  providers: [MessageService],
})
export class PainelConversaoComponent implements OnInit {
  taxa: number = 2.5;
  moedas: string[] = listaMoedas;
  resultado: number | null = null;
  formConversao!: FormGroup;
  transacao: Transacao | null = null;
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private modal: MatDialog,
    private http: HttpService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formConversao = this.fb.group({
      moedaOrigem: [MoedasDisponiveis.OURO_REAL, [Validators.required]],
      moedaDestino: [MoedasDisponiveis.TIBAR, [Validators.required]],
      valor: [
        1,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.consultaTaxa();
  }

  converter(): void {
    const { moedaOrigem, valor, moedaDestino } = this.formConversao.value;

    if (moedaOrigem == MoedasDisponiveis.OURO_REAL) {
      this.resultado = valor * this.taxa;
    } else {
      this.resultado = valor / this.taxa;
    }

    this.transacao = {
      valor,
      taxa: this.taxa,
      moedaOrigem,
      moedaDestino,
      date: this.formatarData(new Date()),
      resultado: this.resultado,
    };
  }

  inverteMoedas(event: string) {
    const moedaOrigem = this.formConversao.get('moedaOrigem');
    const moedaDestino = this.formConversao.get('moedaDestino');
    const moedaAnterior = moedaDestino?.value;
    moedaOrigem?.setValue(moedaAnterior);
    moedaDestino?.setValue(event);
    this.converter();
  }

  verificaPermissaoAlteracao(
    moedaAlterada: AbstractControl | null,
    moedaVerificada: AbstractControl | null
  ) {
    if (moedaAlterada?.value === moedaVerificada?.value) {
      moedaAlterada?.setValue(null);
      const mensagem = 'Moedas de origem e destino não podem ser iguais!';
      this.showError(mensagem);
    }
  }
  verificaInput(valorControl: AbstractControl | null): void {
    console.log(valorControl);
    if (valorControl && valorControl.value <= 0) {
      valorControl!.setErrors({ min: true });
      const mensagem = 'O valor deve ser maior que 0!';
      this.showError(mensagem);
    }
  }

  abrirModal(): void {
    const referenciaModal = this.modal.open(ModalTaxaComponent, {
      width: `384px`,
      height: '256px',
      data: this.taxa,
      autoFocus: false,
    });
    referenciaModal.afterClosed().subscribe((novaTaxa) => {
      if (novaTaxa) {
        this.atualizaTaxa(novaTaxa);
      }
    });
  }

  salvarTransacao() {
    this.http
      .postTransacao(this.transacao)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/historico']);
        },
        error: (err) => {
          this.showError(err.message);
        },
      });
  }
  consultaTaxa() {
    this.http
      .getTaxa()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.taxa = res.taxa;
          this.isLoading = false;
        },
        error: (err) => {
          this.showError(err.message);
        },
      });
  }

  atualizaTaxa(novaTaxa: number) {
    this.http
      .patchTaxa(novaTaxa)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.consultaTaxa();
        },
        error: (err) => {
          this.showError(err.message);
        },
      });
  }

  private formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }

  showError(errorMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    });
  }
}
