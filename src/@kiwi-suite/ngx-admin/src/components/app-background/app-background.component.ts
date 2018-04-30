import {Component, Input} from '@angular/core';
import {ConfigurationService} from '../../services';

@Component({
    selector: 'app-background',
    template: `
        <div [ngStyle]="{opacity: opacity, 'background-color': color, 'background-position': position, 'background-size': size, 'background-image': url}"
             style="position: fixed; top:0; left:0; right: 0; bottom: 0; z-index:-1;">
        </div>`
})
export class AppBackgroundComponent {
    @Input('color') color = '#e4e5e6';
    // @Input('color') color = '#e4F5e6';
    // @Input('color') color = '#f4e5f6';
    @Input('position') position = 'center center';
    @Input('opacity') opacity = 0.5;
    @Input('repeat') repeat = 'repeat';
    @Input('size') size = '';
    @Input('url') _url = '';

    constructor(private config: ConfigurationService) {
    }

    get url() {
        return 'url(' + this._url + ')';
    }
}
