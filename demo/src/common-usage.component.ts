import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { LoaderService } from '../../src/loader.service';

@Component({
    templateUrl: './common-usage.component.html',
    styleUrls: [
        './code-box.component.less',
        './common-usage.component.less'
    ]
})
export class CommonUsageComponent implements AfterViewInit, OnDestroy {

    text = 'loading ...';
    fullScreen = false;
    color = '#4b6e1d';
    dimmerColor = 'rgba(51, 51, 51, 0.3)';
    showDelay = 500;
    hideDelay = 0;

    contents: string[];

    private flag: any;

    constructor(private loadService: LoaderService) {
    }

    ngAfterViewInit() {
        this.loadContents();
    }

    ngOnDestroy() {
        clearTimeout(this.flag);
    }

    run() {
        this.loadService.show();
        this.flag = setTimeout(() => this.loadService.hide(), 3000);
    }

    get code() {
        return `
            <loader [loadingRender]="loading"
                    text="${this.text}"
                    [fullScreen]="${this.fullScreen}"
                    color="${this.color}"
                    dimmerColor="${this.dimmerColor}"
                    showDelay="${this.showDelay}"
                    hideDelay="${this.hideDelay}">
              <ng-template #loading>
                <load-awesome size="2x" color="#fff" type="ball-spin-clockwise-fade"></load-awesome>
              </ng-template>
    
              <div class="content">
                <div class="item" *ngFor="let content of contents">{{content}}</div>
              </div>
            </loader>
        `;
    }

    private loadContents() {
        this.loadService.show();
        this.contents = [];

        this.flag = setTimeout(() => {
            let cnts = [];
            for (let i = 0; i < 30; i++) {
                this.contents.push('I am random content ' + (i + 1));
            }

            this.loadService.hide();
        }, 3000);
    }
}