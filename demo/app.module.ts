import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { CommonUsageComponent } from './src/common-usage.component';
import { LoadAwesomeComponent } from './src/load-awesome.component';
import { DefaultLoadingComponent } from './src/default-loading.component';
import { SemanticModule } from '@demacia/ngx-semantic';
import { LoaderModule } from '../src/loader.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OnlyNumberDirective } from './src/shared/only-number.directive';
import { ColorPickerModule } from 'ngx-color-picker';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions } from 'ngx-highlightjs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRouterModule,
        SemanticModule,
        LoaderModule,
        ColorPickerModule,
        HighlightModule
    ],
    declarations: [
        AppComponent,
        CommonUsageComponent,
        LoadAwesomeComponent,
        DefaultLoadingComponent,
        OnlyNumberDirective
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true
            }
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}