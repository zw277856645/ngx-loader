import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from '../../src/loader.service';
import { randomColor } from './shared/util';

@Component({
    templateUrl: './default-loading.component.html',
    styleUrls: [ './code-box.component.less' ]
})
export class DefaultLoadingComponent implements AfterViewInit {

    size = 'default';
    sizeNumber: number = 20;
    bgColors = [ '#faaacc', '#c8aacc', '#96aacc', '#64aacc', '#32aacc' ];
    delayGap = 100;

    constructor(private loadService: LoaderService) {
    }

    ngAfterViewInit() {
        this.loadService.show();
    }

    get curSize() {
        if (this.size === 'custom') {
            return this.sizeNumber;
        } else {
            return this.size;
        }
    }

    trackByIndex(i: number) {
        return i;
    }

    addColor() {
        this.bgColors.push(randomColor());
    }

    removeColor(i: number) {
        this.bgColors.splice(i, 1);
    }

    get code() {
        return `
            <loader [fullScreen]="false" [loadingRender]="loading">
              <ng-template #loading>
                <dots-slide size="${this.curSize}" delayGap="${this.delayGap}" 
                            [bgColors]="${JSON.stringify(this.bgColors).replace(/"/g, '\'')}"></dots-slide>
              </ng-template>
            </loader>
        `;
    }

}