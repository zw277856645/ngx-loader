import { ElementRef, TemplateRef } from '@angular/core';

export const DEFAULT_LOADER_NAME = 'primary';
export const LOADER_SHOW_DELAY_CLASS = 'loader-show-delay';

export class LayoutContext {

    loadingRender?: TemplateRef<any>;

    text?: string | TemplateRef<any>;

    fullScreen?: boolean;

    dimmerColor?: string;

    color?: string;

    zIndex?: number;
}

export class LoaderConfig extends LayoutContext {

    layoutRender?: TemplateRef<LoaderConfig>;

    showDelay?: number;

    hideDelay?: number;

    invisibleOnLoading?: boolean | Element | ElementRef;
}

export class LoaderOperator extends LoaderConfig {

    name: string;

    show: boolean;

    constructor(params: LoaderOperator) {
        super();
        Object.assign(this, params);
    }
}