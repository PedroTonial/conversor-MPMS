import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-taxa',
  templateUrl: './modal-taxa.component.html',
  styleUrls: ['./modal-taxa.component.scss'],
})
export class ModalTaxaComponent implements OnInit {
  novaTaxa: number = 2.5;

  constructor(
    private dialogRef: MatDialogRef<ModalTaxaComponent>,
    @Inject(MAT_DIALOG_DATA) public taxa: number
  ) {
    this.novaTaxa = taxa;
  }

  ngOnInit(): void {}

  salvarTaxa(): void {
    this.dialogRef.close(this.novaTaxa);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
