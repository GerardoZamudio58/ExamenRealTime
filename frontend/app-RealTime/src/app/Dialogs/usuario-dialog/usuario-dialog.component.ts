import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Usuario } from 'src/app/Interfaces/usuario';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.css']
})
export class UsuarioDialogComponent implements OnInit {
    public titulo: string;
    public usuario: Usuario;
    public imgURL: any;
    public imagenChanged: boolean;
    constructor(
        public dialogRef: MatDialogRef<UsuarioDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario }
    ) {
        this.titulo = 'Nuevo Usuario';
        this.usuario = {
            nombre: '',
            apPaterno: '',
            apMaterno: '',
            correo: '',
            edad: null
        };
        this.imgURL = '';
        this.imagenChanged = false;
    }

    ngOnInit() {
        if (this.data.usuario) {
            this.titulo = 'Editar Usuario';
            this.usuario = this.data.usuario;
            console.log(this.usuario);
            this.imgURL = this.data.usuario.foto;
        } else {
            this.titulo = 'Nuevo Usuario';
        }
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    fileChange(event) {
        this.imagenChanged = true;
        if (event.target.files && event.target.files[0]) {
            this.usuario.avatar = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.imgURL = reader.result;

            reader.readAsDataURL(this.usuario.avatar);
        }
    }

}
