import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './Servicios/usuario.service';
import { WebsocketService } from './Servicios/web-socket.service';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';

const config: SocketIoConfig = {
    url: environment.URL_SERVER, options: {}
};


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SocketIoModule.forRoot(config),
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        UsuarioService,
        WebsocketService,
        Camera,
        FileTransfer
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {}
