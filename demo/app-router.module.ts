import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DefaultLoadingComponent } from './src/default-loading.component';
import { CommonUsageComponent } from './src/common-usage.component';
import { LoadAwesomeComponent } from './src/load-awesome.component';

const routes: Routes = [
    {
        path: 'common-usage',
        component: CommonUsageComponent
    },
    {
        path: 'default-loading',
        component: DefaultLoadingComponent
    },
    {
        path: 'load-awesome',
        component: LoadAwesomeComponent
    },
    {
        path: '',
        redirectTo: 'common-usage',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRouterModule {
}