import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transacao } from '../../../interfaces/transacao';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.scss'],
})
export class ModalDetalhesComponent implements OnInit {
  novaTaxa: number = 2.5;

  constructor(
    private dialogRef: MatDialogRef<ModalDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public transacao: { id: string; data: Transacao }
  ) {}

  ngOnInit(): void {}

  fechar() {
    this.dialogRef.close();
  }
}
