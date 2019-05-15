import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.css']
})
export class UsuarioDialogComponent implements OnInit {

    public titulo: string;
    constructor(
        public dialogRef: MatDialogRef<UsuarioDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idUsuario: number }
    ) {
        this.titulo = 'Nuevo Usuario';
    }

    ngOnInit() {
        if (this.data.idUsuario > 0) {
            this.titulo = 'Editar Usuario';
        } else {
            this.titulo = 'Nuevo Usuario';
        }
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

}
