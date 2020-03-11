import { Component, Input } from '@angular/core';
import { InputNumber } from '@demacia/cmjs-lib';

/**
 * @ignore
 */
interface DotConfig {

    bgColor: string,

    delay: number,

    size?: number,

    sizeClass?: string
}

/**
 * 默认 loading
 *
 * ---
 *
 * 使用示例
 *
 * ~~~ html
 * <loader [loadingRender]="loadingTemplate">
 *   <ng-template #loadingTemplate>
 *     <dots-slide size="large" delayGap="200"></dots-slide>
 *   </ng-template>
 * </loader>
 * ~~~
 */
@Component({
    selector: 'dots-slide',
    templateUrl: './dots-slide.component.html',
    styleUrls: [ './dots-slide.component.less' ]
})
export class DotsSlideComponent {

    /**
     * 大小
     *
     * - small = 10px，default = 20px，large = 30px
     * - 数值类型，自定义任意大小
     */
    @Input() size: 'small' | 'default' | 'large' | number = 'default';

    /**
     * 各 div 背景色，`div 数量等于该数组长度`
     */
    @Input() bgColors: string[] = [ '#faaacc', '#c8aacc', '#96aacc', '#64aacc', '#32aacc' ];

    /**
     * 各 div 之间的动画延时间隔(ms)
     */
    @Input() @InputNumber() delayGap: number = 100;

    /**
     * @ignore
     */
    get dots(): DotConfig[] {
        return this.bgColors.filter(v => v).map((bgColor, index) => {
            let config: DotConfig = { bgColor, delay: index * (this.delayGap || 0) };

            if (!isNaN(parseInt(this.size as string))) {
                config.size = parseInt(this.size as string);
            } else {
                config.sizeClass = this.size as string;
            }

            return config;
        });
    }

    trackByIndex(i: number) {
        return i;
    }
}