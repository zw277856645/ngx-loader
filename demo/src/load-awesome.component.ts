import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from '../../src/loader.service';
import { LOADER_DIV_COUNT_MAP } from '../../src/load-awesome/loader-div-count-map';

@Component({
    templateUrl: './load-awesome.component.html',
    styleUrls: [ './code-box.component.less' ]
})
export class LoadAwesomeComponent implements AfterViewInit {

    size = '2x';
    color = '#419593';
    type = 'ball-running-dots';

    constructor(private loadService: LoaderService) {
    }

    ngAfterViewInit() {
        this.loadService.show();
    }

    get types() {
        return Object.keys(LOADER_DIV_COUNT_MAP);
    }

    get code() {
        return `
            <loader [fullScreen]="false" [loadingRender]="loading">
              <ng-template #loading>
                <load-awesome size="${this.size}" color="${this.color}" type="${this.type}"></load-awesome>
              </ng-template>
            </loader>
        `;
    }
}