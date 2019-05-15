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

@NgModule({
    declarations: [
        AppComponent,
        ConfirmComponent,
        UsuarioDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        ConfirmComponent,
        UsuarioDialogComponent
    ],
    providers: [UsuarioService],
    bootstrap: [AppComponent]
})
export class AppModule { }
