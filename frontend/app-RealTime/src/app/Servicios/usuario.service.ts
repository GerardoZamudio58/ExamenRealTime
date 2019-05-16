import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../Interfaces/response';
import { Usuario } from '../Interfaces/usuario';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private url = environment.URL_SERVER;
    constructor(
        private httpClient: HttpClient,
        private wsService: WebsocketService
    ) { }

    ObtenerUsuarios(): Observable<Response> {
        return this.httpClient.get<Response>(`${this.url}/Usuarios`);
    }

    AgregarUsuario(usuario: Usuario): Observable<Response> {
        const formData: FormData = new FormData();
        formData.append('nombre', usuario.nombre);
        formData.append('apPaterno', usuario.apPaterno);
        formData.append('apMaterno', usuario.apMaterno);
        formData.append('correo', usuario.correo);
        formData.append('edad', usuario.edad.toString());
        formData.append('avatar', usuario.avatar);
        return this.httpClient.post<Response>(`${this.url}/Usuario`, formData );
    }

    ActualizarUsuario(usuario: Usuario, idUsuario: number): Observable<Response> {
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
}
