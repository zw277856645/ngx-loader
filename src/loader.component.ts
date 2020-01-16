import {
    ChangeDetectionStrategy, Component, ElementRef, EmbeddedViewRef, Input, Renderer2, TemplateRef, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { InputBoolean, InputNumber } from '@demacia/cmjs-lib';
import { Subscription } from 'rxjs';
import { DEFAULT_LOADER_NAME, LayoutContext, LOADER_SHOW_DELAY_CLASS } from './models';
import { LoaderService } from './loader.service';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: [ './loader.component.less' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

    @Input() @ViewChild('defaultLoading', { static: true }) loadingRender: TemplateRef<any>;

    @Input() @ViewChild('defaultLayout', { static: true }) layoutRender: TemplateRef<LayoutContext>;

    @Input() text: string | TemplateRef<any>;

    @Input() @InputBoolean() fullScreen: boolean = true;

    @Input() @InputNumber() showDelay: number = 500;

    @Input() @InputNumber() hideDelay: number = 0;

    @Input() dimmerColor: string = 'rgba(0, 0, 0, 0)';

    @Input() color: string = '#333';

    @Input() @InputNumber() zIndex: number = 9999;

    @Input() invisibleOnLoading: boolean | Element | ElementRef = false;

    @Input() name: string = DEFAULT_LOADER_NAME;

    private view: EmbeddedViewRef<LayoutContext>;
    private subscription = new Subscription();
    private hideFlag: any;

    constructor(private eleRef: ElementRef,
                private containerRef: ViewContainerRef,
                private renderer: Renderer2,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.subscription.add(
            this.loaderService.getLoader(this.name).subscribe(operator => {
                Object.keys(operator)
                      .filter(key => [ 'show', 'name' ].indexOf(key) < 0)
                      .forEach(key => {
                          if (operator[ key ] !== null && operator[ key ] !== undefined) {
                              this[ key ] = operator[ key ];
                          }
                      });

                if (operator.show) {
                    this.createView();
                } else {
                    this.destroyView(this.hideDelay);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        clearTimeout(this.hideFlag);

        if (this.view) {
            this.view.destroy();
        }
    }

    private get invisibleElement() {
        if (this.invisibleOnLoading instanceof ElementRef) {
            return this.invisibleOnLoading.nativeElement;
        } else if (this.invisibleOnLoading instanceof Element) {
            return this.invisibleOnLoading;
        }
    }

    private setHidden(ele: Element) {
        this.renderer.setStyle(ele, 'visibility', 'hidden');
    }

    private setVisible(ele: Element) {
        this.renderer.setStyle(ele, 'visibility', 'visible');
    }

    private static toBoolean(value: any) {
        return value != null && `${value}` !== 'false';
    }

    private createView() {
        if (!this.fullScreen) {
            let parentStyles = getComputedStyle(this.eleRef.nativeElement.parentElement);
            if ([ 'absolute', 'relative', 'fixed' ].indexOf(parentStyles[ 'position' ]) < 0) {
                this.renderer.setStyle(this.eleRef.nativeElement.parentElement, 'position', 'relative');
            }
        }

        if (this.view) {
            clearTimeout(this.hideFlag);
            this.view.destroy();
        }

        if (LoaderComponent.toBoolean(this.invisibleOnLoading)) {
            this.setHidden(this.eleRef.nativeElement);
        }
        if (this.invisibleElement) {
            this.setHidden(this.invisibleElement);
        }

        this.view = this.layoutRender.createEmbeddedView({
            loadingRender: this.loadingRender,
            text: this.text,
            fullScreen: this.fullScreen,
            dimmerColor: this.dimmerColor,
            color: this.color,
            zIndex: this.zIndex
        });

        if (this.showDelay > 0) {
            this.renderer.addClass(this.view.rootNodes[ 0 ], LOADER_SHOW_DELAY_CLASS);
            this.renderer.setStyle(this.view.rootNodes[ 0 ], 'animation-delay', this.showDelay + 'ms');
        }

        this.containerRef.insert(this.view);
    }

    private destroyView(delay: number = 0) {
        if (delay > 0) {
            this.hideFlag = setTimeout(() => this.destroyView(), delay);
        } else {
            if (this.view) {
                this.view.destroy();
                this.view = null;

                if (LoaderComponent.toBoolean(this.invisibleOnLoading)) {
                    this.setVisible(this.eleRef.nativeElement);
                }
                if (this.invisibleElement) {
                    this.setVisible(this.invisibleElement);
                }
            }
        }
    }

}