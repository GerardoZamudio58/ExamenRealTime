import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './Servicios/usuario.service';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from './Dialogs/confirm/confirm.component';
import { UsuarioDialogComponent } from './Dialogs/usuario-dialog/usuario-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        private usuarioService: UsuarioService,
        public dialog: MatDialog
    ) {

    }

    ngOnInit(): void {
        this.usuarioService.ObtenerUsuarios().subscribe(resp => {
            console.log(resp);
        });
    }

    BtnEditarClick(idUsuario: number) {
        const dialogRef = this.dialog.open(UsuarioDialogComponent, {
            width: '350px',
            data: { idUsuario }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    BtnEliminarClick() {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '350px',
            data: { txt: '¿Desea eliminar el usaurio?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

}
