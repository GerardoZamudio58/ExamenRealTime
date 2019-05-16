import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interfaces/usuario';
import { UsuarioService } from '../Servicios/usuario.service';
import { WebsocketService } from '../Servicios/web-socket.service';
import { Response } from '../Interfaces/response';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public usuarios: Usuario[];


    constructor(
        private usuarioService: UsuarioService,
        public wsService: WebsocketService,
        public alertController: AlertController,
        private router: Router
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
            console.log(result);
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

    async presentAlert(idUsuario: number) {
        const alert = await this.alertController.create({
          header: 'Eliminar Usuario',
          message: '¿Seguro que quiere eliminar el usuario?',
          buttons: ['Cancelar', {
            text: 'Okay',
            handler: () => {
              this.eliminarUsuario(idUsuario);
            }
          }]
        });
        await alert.present();
      }

    eliminarUsuario(idUsuario: number) {
        this.usuarioService.EliminarUsuario(idUsuario).subscribe((result: Response) => {
            this.ObtenerUsuarios();
            this.usuarioService.EnviarCambio();
        });
    }

    btnEliminarClick(idUsuario: number) {
        this.presentAlert(idUsuario);
    }

    EditarUsuario(idUsuario: number) {
        this.router.navigate([`/usuario/${idUsuario}`]);
    }

    AgregarUsuario() {
        this.router.navigate([`/usuario/0`]);
    }
}
