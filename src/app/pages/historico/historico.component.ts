import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Transacao } from '../../shared/interfaces/transacao';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ModalDetalhesComponent } from '../../shared/components/modals/modal-detalhes/modal-detalhes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { listaMoedas } from 'src/app/shared/enums/moedasEnum';
import { filtrosAnimacao } from 'src/app/shared/animations/filtros.animations';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
  animations: [filtrosAnimacao],
})
export class HistoricoComponent implements OnInit {
  transacoes: { id: string; data: Transacao }[] = [];
  transacoesFiltradas: { id: string; data: Transacao }[] = [];
  moedasUnicas: string[] = [];
  moedas: string[] = listaMoedas;
  exibirFiltros: boolean = false;

  filtroMoeda: string = '';
  filtroMoedaDestino: string = '';
  filtroData: string = '';
  filtroValorMin: number | null = null;
  filtroValorMax: number | null = null;

  itensPaginados!: any[];
  pageIndex: number = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 15];
  pageEvent: any;
  isLoading: boolean = true;

  constructor(
    private requestService: HttpService,
    private router: Router,
    private modalDetalhes: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.requestService
      .getTransacao()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          const transacaoRecebida = Object.keys(data).map((key) => ({
            id: key,
            data: data[key],
          }));

          this.transacoes = [...transacaoRecebida];

          this.transacoesFiltradas = [...this.transacoes];

          this.atualizaPaginacao(this.transacoesFiltradas);

          this.moedasUnicas = [
            ...new Set(this.transacoes.map((t) => t.data.moedaOrigem)),
          ];

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar as transações:', err);
        },
      });
  }

  atualizarPagina(): void {
    const startIndex = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const endIndex = startIndex + this.pageEvent.pageSize;
    this.pageEvent = this.transacoesFiltradas.slice(startIndex, endIndex);
  }

  atualizaAoTrocarPagina(event: any, listaPaginada: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.atualizaPaginacao(listaPaginada);
  }

  atualizaPaginacao(listaItens: any[]) {
    const startIndex = this.pageIndex * this.pageSize;
    this.itensPaginados = listaItens.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  aplicarFiltro(): void {
    this.transacoesFiltradas = this.transacoes.filter((transacao) => {
      const moedaMatch =
        !this.filtroMoeda || transacao.data.moedaOrigem === this.filtroMoeda;

      const moedaMatchDestino =
        !this.filtroMoedaDestino ||
        transacao.data.moedaDestino === this.filtroMoedaDestino;

      const dataMatch =
        !this.filtroData || transacao.data.date === this.filtroData;

      const valorMatch =
        (this.filtroValorMin === null ||
          transacao.data.valor >= this.filtroValorMin) &&
        (this.filtroValorMax === null ||
          transacao.data.valor <= this.filtroValorMax);

      return moedaMatch && dataMatch && valorMatch && moedaMatchDestino;
    });
    console.log(this.transacoesFiltradas);
    console.log(this.filtroValorMax);
    this.atualizaPaginacao(this.transacoesFiltradas);
  }

  toggleExibirFiltros() {
    this.exibirFiltros = !this.exibirFiltros;
  }

  limparFiltros(): void {
    this.filtroValorMin = null;
    this.filtroValorMax = null;
    this.filtroMoeda = '';
    this.filtroMoedaDestino = '';
    this.filtroData = '';
    this.aplicarFiltro();
  }

  detalhes(transacao: { id: string; data: Transacao }) {
    const referenciaModal = this.modalDetalhes.open(ModalDetalhesComponent, {
      width: `400px`,
      height: '350px',
      data: transacao,
      autoFocus: false,
    });
    referenciaModal.afterClosed().subscribe();
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

  bloqueiaLetraE(event: KeyboardEvent) {
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  }
}
