import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interfaces/usuario';
import { UsuarioService } from '../Servicios/usuario.service';
import { WebsocketService } from '../Servicios/web-socket.service';
import { Response } from '../Interfaces/response';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public usuarios: Usuario[];


    constructor(
        private usuarioService: UsuarioService,
        public wsService: WebsocketService
    ) {
        this.usuarios = [];
    }

    ngOnInit(): void {
        this.ObtenerUsuarios();
        this.usuarioService.EscucharCambio().subscribe(cambio => {
            this.ObtenerUsuarios();
        });
    }

    ObtenerUsuarios(): void {
        this.usuarioService.ObtenerUsuarios().subscribe((result: Response) => {
            this.usuarios = result.resp;
        });
    }

    getUrlAvatar(avatar) {
        if (avatar) {
            return `${environment.URL_SERVER}/GetAvatar/${avatar}`;
        } else {
            return './assets/user.png';
        }
    }
}
