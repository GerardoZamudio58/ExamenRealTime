import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './Servicios/usuario.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private usuarioService: UsuarioService) {

    }

    ngOnInit(): void {
        this.usuarioService.ObtenerUsuarios().subscribe(resp => {
            console.log(resp);
        });
    }

}
