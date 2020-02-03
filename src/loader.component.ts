import {
    ChangeDetectionStrategy, Component, ElementRef, EmbeddedViewRef, Input, Renderer2, TemplateRef, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { InputBoolean, InputNumber } from '@demacia/cmjs-lib';
import { Subscription } from 'rxjs';
import { DEFAULT_LOADER_NAME, LayoutContext, LOADER_SHOW_DELAY_CLASS } from './models';
import { LoaderService } from './loader.service';

/**
 * 插件的控制中心，配置初始参数，[`参数可被服务在调用时覆盖`]{@link LoaderService#show}
 *
 * <example-url>/ngx-loader/demo/index.html</example-url>
 */
@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: [ './loader.component.less' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

    /**
     * loading 动画模板，不设置则使用[`内置模板`]{@link DotsSlideComponent}
     */
    @Input() @ViewChild('defaultLoading', { static: true }) loadingRender: TemplateRef<any>;

    /**
     * 整体布局模板
     *
     * ---
     *
     * 自定义布局模板示例
     *
     * ~~~ html
     * <loader [layoutRender]="layoutTemplate">
     *   <ng-template #layoutTemplate
     *                let-loadingRender="loadingRender"
     *                let-text="text"
     *                let-fullScreen="fullScreen"
     *                let-dimmerColor="dimmerColor"
     *                let-color="color"
     *                let-zIndex="zIndex">
     *     <div class="my-loading" [style.background-color]="dimmerColor">
     *       <ng-template [ngTemplateOutlet]="loadingRender"></ng-template>
     *       <ng-container *switcherTemplateOutlet="text">{{text}}</ng-container>
     *     </div>
     *   </ng-template>
     * </loader>
     * ~~~
     */
    @Input() @ViewChild('defaultLayout', { static: true }) layoutRender: TemplateRef<LayoutContext>;

    /**
     * loading 文字描述模板
     *
     * ---
     *
     * 使用字符串
     *
     * ~~~ html
     * <loader text="Hello World"></loader>
     * ~~~
     *
     * 使用模板
     *
     * ~~~ html
     * <loader [text]="textTemplate">
     *   <ng-template #textTemplate>
     *     <h1>Hello World</h1>
     *   </ng-template>
     * </loader>
     * ~~~
     */
    @Input() text: string | TemplateRef<any>;

    /**
     * 是否全屏
     *
     * ---
     *
     * 全屏模式特点
     *
     * - 采用 `position: fixed` 定位
     * - <loader> 可放置在任意位置
     *
     * ~~~ html
     * <div class="container">
     *   <!-- 待加载内容 -->
     *   <div *ngFor="let content of contents"> ... </div>
     * </div>
     *
     * <loader></loader>
     * ~~~
     *
     * 窗口模式特点
     *
     * - 采用 `position: absolute` 定位，父元素会自动设置合适的 `position` 值
     * - <loader> 必须放置在窗口容器中，必须是直接子元素
     *
     * ~~~ html
     * <div class="container">
     *   <loader [fullScreen]="false"></loader>
     *
     *   <!-- 待加载内容 -->
     *   <div *ngFor="let content of contents"> ... </div>
     * </div>
     *
     * <!-- 或 -->
     *
     * <div class="container">
     *   <loader [fullScreen]="false">
     *     <!-- 待加载内容 -->
     *     <div *ngFor="let content of contents"> ... </div>
     *   </loader>
     * </div>
     * ~~~
     */
    @Input() @InputBoolean() fullScreen: boolean = true;

    /**
     * 延时显示时间(ms)
     *
     * - 用于优化响应较快，loading 刚显示就隐藏而造成的闪烁不良体验，在延时时间内隐藏，loading 将不会显示
     * - 不是使用 setTimeout 延时，会被 DOM 渲染阻塞。使用了 css 延时，不会被 DOM 渲染阻塞
     */
    @Input() @InputNumber() showDelay: number = 500;

    /**
     * 延时隐藏时间(ms)
     */
    @Input() @InputNumber() hideDelay: number = 0;

    /**
     * 遮罩层背景色，默认透明
     */
    @Input() dimmerColor: string = 'rgba(0, 0, 0, 0)';

    /**
     * 主题颜色
     */
    @Input() color: string = '#333';

    /**
     * z-index 值
     */
    @Input() @InputNumber() zIndex: number = 9999;

    /**
     * 设置 loading 过程中是否需要隐藏内容或需要隐藏的目标元素
     *
     * ---
     *
     * **一种使用场景介绍**
     *
     * 当内容渲染完毕时，你可能还有一些其他操作，比如滚动到某长列表特定条目处，你可能不希望用户看到滚动过程，当滚动
     * 完成时才真正显示内容
     *
     * ---
     *
     * 值为 boolean 类型，代表需要隐藏的目标元素为 <loader> 子元素
     *
     * ~~~ html
     * <loader invisibleOnLoading>
     *   <!-- 在加载中时，一直处于隐藏状态 -->
     *   <div class="container">
     *     <!-- 待加载内容 -->
     *     <div *ngFor="let content of contents"> ... </div>
     *   </div>
     * </loader>
     * ~~~
     *
     * 值为 DOM 元素时，需要隐藏的目标元素可以放置在任意地方
     *
     * ~~~ html
     * <loader [invisibleOnLoading]="ele"></loader>
     *
     * <!-- 在加载中时，一直处于隐藏状态 -->
     * <div class="container" #ele>
     *   <!-- 待加载内容 -->
     *   <div *ngFor="let content of contents"> ... </div>
     * </div>
     * ~~~
     */
    @Input() invisibleOnLoading: boolean | Element | ElementRef = false;

    /**
     * 代表自身实例的唯一名称，用于多个 loader 模式
     *
     * ---
     *
     * 多 loader 示例
     *
     * ~~~ html
     * <div class="container-1">
     *   <loader name="loader-1" [fullScreen]="false"></loader>
     *   ...
     * </div>
     *
     * <div class="container-2">
     *   <loader name="loader-2" [fullScreen]="false"></loader>
     *   ...
     * </div>
     * ~~~
     *
     * ~~~ js
     * \@Component({ ... })
     * export class DemoComponent implements OnInit {
     *
     *     constructor(private loaderService: LoaderService) {
     *     }
     *
     *     ngOnInit() {
     *         this.loaderService.show('loader-1');
     *         this.loaderService.show('loader-2');
     *     }
     * }
     * ~~~
     */
    @Input() name: string = DEFAULT_LOADER_NAME;

    private view: EmbeddedViewRef<LayoutContext>;
    private subscription = new Subscription();
    private hideFlag: any;

    /**
     * @ignore
     */
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