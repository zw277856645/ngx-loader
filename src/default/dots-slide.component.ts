import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputNumber } from '@demacia/cmjs-lib';

interface DotConfig {

    bgColor: string,

    delay: number,

    size?: number,

    sizeClass?: string
}

@Component({
    selector: 'dots-slide',
    templateUrl: './dots-slide.component.html',
    styleUrls: [ './dots-slide.component.less' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotsSlideComponent {

    @Input() size: 'small' | 'default' | 'large' | number = 'default';

    @Input() bgColors: string[] = [ '#faaacc', '#c8aacc', '#96aacc', '#64aacc', '#32aacc' ];

    @Input() @InputNumber() delayGap: number = 0.1;

    get dots(): DotConfig[] {
        return this.bgColors.filter(v => v).map((bgColor, index) => {
            let config: DotConfig = { bgColor, delay: index * this.delayGap };

            if (!isNaN(parseInt(this.size as string))) {
                config.size = parseInt(this.size as string);
            } else {
                config.sizeClass = this.size as string;
            }

            return config;
        });
    }
}