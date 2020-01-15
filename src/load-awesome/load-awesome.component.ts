import { Component, Input } from '@angular/core';
import { LOADER_DIV_COUNT_MAP } from './loader-div-count-map';

interface LoadAwesomeConfig {

    classNames: string;

    color: string;

    divs: any[];
}

@Component({
    selector: 'load-awesome',
    templateUrl: './load-awesome.component.html',
    styleUrls: [
        './loaders.css',
        './load-awesome.component.less'
    ]
})
export class LoadAwesomeComponent {

    @Input() color: string = '#333';

    @Input() size: 'small' | 'default' | '2x' | '3x';

    @Input() type: string;

    get config(): LoadAwesomeConfig {
        if (LOADER_DIV_COUNT_MAP[ this.type ]) {
            return {
                classNames: this.getClasses(),
                color: this.color,
                divs: new Array(LOADER_DIV_COUNT_MAP[ this.type ]).fill(0)
            };
        }
    }

    private getClasses() {
        let typeClass = 'la-' + this.type;
        let sizeClass = '';

        switch ((this.size || '').toLowerCase()) {
            case 'small':
                sizeClass = 'la-sm';
                break;
            case '2x':
                sizeClass = 'la-2x';
                break;
            case '3x':
                sizeClass = 'la-3x';
                break;
        }

        return typeClass + ' ' + sizeClass;
    }
}