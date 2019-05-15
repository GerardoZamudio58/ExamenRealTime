import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private url = environment.URL_SERVER;
    constructor(private httpClient: HttpClient) { }

    ObtenerUsuarios(): Observable<Response> {
        return this.httpClient.get<Response>(`${this.url}/Usuarios`);
    }
}
