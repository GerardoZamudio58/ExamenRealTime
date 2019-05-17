import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../Interfaces/response';
import { Usuario } from '../Interfaces/usuario';
import { WebsocketService } from './web-socket.service';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private url = environment.URL_SERVER;
    constructor(
        private httpClient: HttpClient,
        private wsService: WebsocketService,
        // tslint:disable-next-line:variable-name
        private _FileTransfer: FileTransfer
    ) {
        const base64 = 'data:image/png;base64,';
    }

    ObtenerUsuarios(): Observable<Response> {
        return this.httpClient.get<Response>(`${this.url}/Usuarios`);
    }

    ObtenerUsuario(idUsuario: number): Observable<Response> {
        return this.httpClient.get<Response>(`${this.url}/Usuario/${idUsuario}`);
    }

    AgregarUsuario(usuario: Usuario): Observable<Response> {
        const formData: FormData = new FormData();
        formData.append('nombre', usuario.nombre);
        formData.append('apPaterno', usuario.apPaterno);
        formData.append('apMaterno', usuario.apMaterno);
        formData.append('correo', usuario.correo);
        formData.append('edad', usuario.edad.toString());
        formData.append('avatar', usuario.avatar);
        return this.httpClient.post<Response>(`${this.url}/Usuario`, formData);
    }


    ActualizarUsuario(usuario: Usuario, idUsuario: number): Observable<Response> {
        console.log('usuario', usuario);
        const formData: FormData = new FormData();
        formData.append('nombre', usuario.nombre);
        formData.append('apPaterno', usuario.apPaterno);
        formData.append('apMaterno', usuario.apMaterno);
        formData.append('correo', usuario.correo);
        formData.append('edad', usuario.edad.toString());
        formData.append('avatar', usuario.avatar);
        return this.httpClient.put<Response>(`${this.url}/Usuario/${idUsuario}`, formData);
    }

    EliminarUsuario(idUsuario: number): Observable<Response> {
        return this.httpClient.delete<Response>(`${this.url}/Usuario/${idUsuario}`);
    }

    EnviarCambio() {
        this.wsService.emit('cambio');
    }

    EscucharCambio() {
        return this.wsService.listen('cambio');
    }

    subirImagen(img: string) {
        const options: FileUploadOptions = {
            fileKey: 'avatar'
        };
        const PATHIMG = img.split('/');
        const NAMEIMG = PATHIMG[PATHIMG.length - 1];

        const fileTranfer: FileTransferObject = this._FileTransfer.create();
        return fileTranfer.upload(img, `${ this.url }/UploadImg/${NAMEIMG}`, options);
    }
}
