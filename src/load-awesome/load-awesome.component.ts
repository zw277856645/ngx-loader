import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LOADER_DIV_COUNT_MAP } from './loader-div-count-map';

interface LoadAwesomeConfig {

    classNames: string;

    color: string;

    divs: any[];
}

/**
 * [load awesome]{@link https://github.danielcardoso.net/load-awesome/animations.html}
 *
 * ---
 *
 * 使用示例
 *
 * ~~~ html
 * <loader [loadingRender]="loadingTemplate">
 *   <ng-template #loadingTemplate>
 *     <load-awesome size="small" type="ball-8bits"></load-awesome>
 *   </ng-template>
 * </loader>
 * ~~~
 */
@Component({
    selector: 'load-awesome',
    templateUrl: './load-awesome.component.html',
    styleUrls: [
        './load-awesome.component.css',
        './load-awesome-fix.component.less'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadAwesomeComponent {

    /**
     * 颜色
     */
    @Input() color: string = '#333';

    /**
     * 大小
     */
    @Input() size: 'small' | 'default' | '2x' | '3x' = 'default';

    /**
     * loading 类型，`需去掉 la- 前缀`
     */
    @Input() type: string = 'ball-scale-multiple';

    /**
     * @ignore
     */
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