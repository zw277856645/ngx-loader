import { ElementRef, TemplateRef } from '@angular/core';

/**
 * loader 默认 name
 */
export const DEFAULT_LOADER_NAME = 'primary';

/**
 * loader 延时显示添加的 class
 */
export const LOADER_SHOW_DELAY_CLASS = 'loader-show-delay';

/**
 * 自定义布局上下文环境
 */
export class LayoutContext {

    loadingRender?: TemplateRef<any>;

    text?: string | TemplateRef<any>;

    fullScreen?: boolean;

    dimmerColor?: string;

    color?: string;

    zIndex?: number;
}

/**
 * LoaderService [show]{@link LoaderService#show} 方法启动配置
 */
export class LoaderConfig extends LayoutContext {

    layoutRender?: TemplateRef<LoaderConfig>;

    showDelay?: number;

    hideDelay?: number;

    invisibleOnLoading?: boolean | Element | ElementRef;
}

/**
 * @ignore
 *
 * 内部使用
 */
export class LoaderOperator extends LoaderConfig {

    name: string;

    show: boolean;

    constructor(params: LoaderOperator) {
        super();
        Object.assign(this, params);
    }
}