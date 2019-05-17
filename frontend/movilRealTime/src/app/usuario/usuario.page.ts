import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsuarioService } from '../Servicios/usuario.service';
import { Response } from '../Interfaces/response';
import { Usuario } from '../Interfaces/usuario';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';


declare var window: any;
@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.page.html',
    styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

    public titulo: string;
    public idUsuario: string;
    public img: any;
    public usuario: Usuario;
    public cambioImagen: boolean;
    constructor(
        private activatedRoute: ActivatedRoute,
        private camera: Camera,
        private usuarioService: UsuarioService,
        private navCtrl: NavController
    ) {
        this.titulo = 'Agregar ';
        this.idUsuario = '';
        this.img = './assets/user.png';
        this.usuario = {
            nombre: null,
            apPaterno: null,
            apMaterno: null,
            correo: null,
            edad: null
        };
        this.cambioImagen = false;
    }

    ngOnInit() {
        this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idUsuario');
        console.log(this.idUsuario);
        if (this.idUsuario !== '0') {
            this.titulo = 'Actualizar ';
            // tslint:disable-next-line: radix
            this.ObtenerUsuario(parseInt(this.idUsuario));
        } else {
            this.titulo = 'Agregar ';
            this.img = './assets/user.png';
        }
    }

    ObtenerUsuario(idUsuario: number) {
        this.usuarioService.ObtenerUsuario(idUsuario).subscribe((result: any) => {
            this.usuario = result.resp;
            if (this.usuario.foto) {
                this.img = `${environment.URL_SERVER}/GetAvatar/${this.usuario.foto}`;
            }
        });
    }

    Guardar() {
        if (this.cambioImagen === true) {
            this.usuarioService.subirImagen(this.usuario.avatar).then( result => {
                console.log(result);
                this.SubirUsuario();
            }).catch(err => console.log);
        } else {
            this.SubirUsuario();
        }
    }

    SubirUsuario() {
        console.log('pasa');
        if (this.idUsuario !== '0') {
            // tslint:disable-next-line: radix
            this.usuarioService.ActualizarUsuario(this.usuario, parseInt(this.idUsuario)).subscribe((result: Response) => {
                this.usuarioService.EnviarCambio();
                console.log(result);
                this.navCtrl.back();
            });
        } else {
            this.usuarioService.AgregarUsuario(this.usuario).subscribe((result: Response) => {
                this.usuarioService.EnviarCambio();
                console.log(result);
                this.navCtrl.back();
            });
        }
    }

    uploadImg() {
        const options: CameraOptions = {
            quality: 80,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            const img = window.Ionic.WebView.convertFileSrc(imageData);
            // const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.img = img;
            this.usuario.avatar = imageData;
            this.cambioImagen = true;
        }, (err) => {
            // Handle error
        });
    }
}
