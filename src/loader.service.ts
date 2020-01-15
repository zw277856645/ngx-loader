import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DEFAULT_LOADER_NAME, LoaderConfig, LoaderOperator } from './models';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private subject = new Subject<LoaderOperator>();

    constructor() {
    }

    getLoader(name?: string) {
        return this.subject.asObservable().pipe(filter(config => config.name === (name || DEFAULT_LOADER_NAME)));
    }

    show(name?: string, config?: LoaderConfig) {
        return Promise.resolve(true).then(() => {
            if (config && Object.keys(config).length) {
                this.subject.next({ ...config, name: name || DEFAULT_LOADER_NAME, show: true });
            } else {
                this.subject.next(new LoaderOperator({ name: name || DEFAULT_LOADER_NAME, show: true }));
            }
        });
    }

    hide(name?: string) {
        return Promise.resolve(true).then(() => {
            this.subject.next(new LoaderOperator({ name: name || DEFAULT_LOADER_NAME, show: false }));
        });
    }
}