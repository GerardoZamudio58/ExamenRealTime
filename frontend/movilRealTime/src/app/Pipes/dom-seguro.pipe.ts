import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Pipe({
  name: 'domSeguro'
})
export class DomSeguroPipe implements PipeTransform {

    private URL = '';

    constructor(private domSanitizer: DomSanitizer) {
        this.URL = environment.URL_SERVER;
    }

    transform(value: string, url: string): any {
        const path = this.URL + url + value;
        if (value) {
            return this.domSanitizer.bypassSecurityTrustResourceUrl(path);
        } else {
            return './assets/user.png';
        }
    }

}
