import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from './material.module';
import { UsuarioService } from './Servicios/usuario.service';
import { ConfirmComponent } from './Dialogs/confirm/confirm.component';
import { UsuarioDialogComponent } from './Dialogs/usuario-dialog/usuario-dialog.component';
import { DomSeguroPipe } from './Pipes/dom-seguro.pipe';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
    url: environment.URL_SERVER, options: {}
};


@NgModule({
    declarations: [
        AppComponent,
        ConfirmComponent,
        UsuarioDialogComponent,
        DomSeguroPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        SocketIoModule.forRoot(config)
    ],
    entryComponents: [
        ConfirmComponent,
        UsuarioDialogComponent
    ],
    providers: [UsuarioService],
    bootstrap: [AppComponent]
})
export class AppModule { }
