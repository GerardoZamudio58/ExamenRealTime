import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './Servicios/usuario.service';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from './Dialogs/confirm/confirm.component';
import { UsuarioDialogComponent } from './Dialogs/usuario-dialog/usuario-dialog.component';
import { Usuario } from './Interfaces/usuario';
import { Response } from './Interfaces/response';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './Servicios/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public usuarios: Usuario[];

    constructor(
        private usuarioService: UsuarioService,
        public dialog: MatDialog,
        public wsService: WebsocketService
    ) {
        this.usuarios = [];
    }

    ngOnInit(): void {
        this.ObtenerUsuarios();
        this.usuarioService.EscucharCambio().subscribe( cambio => {
            this.ObtenerUsuarios();
        });

    }

    ObtenerUsuarios(): void {
        this.usuarioService.ObtenerUsuarios().subscribe((result: Response) => {
            this.usuarios = result.resp;
        });
    }

    BtnEditarClick(usuario: Usuario): void {
        const dialogRef = this.dialog.open(UsuarioDialogComponent, {
            width: '350px',
            data: { usuario }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!usuario && result) {
                console.log(result);
                this.AgregarUsuario(result);
            } else if (usuario && result) {
                this.ActualzarUsuairo(result, result.idUsuario);
            }
        });
    }

    AgregarUsuario(usaurio: Usuario): void {
        this.usuarioService.AgregarUsuario(usaurio).subscribe((result: Response) => {
            console.log(result);
            this.ObtenerUsuarios();
            this.usuarioService.EnviarCambio();
        });
    }

    ActualzarUsuairo(usaurio: Usuario, idUsuario: number): void {
        this.usuarioService.ActualizarUsuario(usaurio, idUsuario).subscribe((result: Response) => {
            this.ObtenerUsuarios();
            this.usuarioService.EnviarCambio();
        });
    }

    BtnEliminarClick(idUsuario: number): void {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '350px',
            data: { txt: '¿Desea eliminar el usaurio?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.eliminarUsuario(idUsuario);
            }
        });
    }

    eliminarUsuario(idUsuario: number) {
        this.usuarioService.EliminarUsuario(idUsuario).subscribe((result: Response) => {
            this.ObtenerUsuarios();
            this.usuarioService.EnviarCambio();
        });
    }

}
