import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { CmjsLibModule } from '@demacia/cmjs-lib';
import { DotsSlideComponent } from './default/dots-slide.component';
import { LoadAwesomeComponent } from './load-awesome/load-awesome.component';

/**
 * @ignore
 */
const MODULES = [
    CommonModule,
    CmjsLibModule
];

/**
 * @ignore
 */
const COMPONENTS = [
    LoaderComponent,
    DotsSlideComponent,
    LoadAwesomeComponent
];

@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...MODULES,
        ...COMPONENTS
    ]
})
export class LoaderModule {
}