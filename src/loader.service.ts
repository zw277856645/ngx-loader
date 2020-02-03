import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DEFAULT_LOADER_NAME, LoaderConfig, LoaderOperator } from './models';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private subject = new Subject<LoaderOperator>();

    /**
     * @ignore
     *
     * 不可省略，angular DI 需要
     */
    constructor() {
    }

    /**
     * 获取指定 loader 的启动配置
     *
     * @param name loader name，多 loader 模式下需要，
     * 不提供则使用[默认名称](/miscellaneous/variables.html#DEFAULT_LOADER_NAME)
     */
    getLoader(name?: string): Observable<LoaderOperator> {
        return this.subject.asObservable().pipe(filter(config => config.name === (name || DEFAULT_LOADER_NAME)));
    }

    /**
     * 显示指定 loader
     *
     * @param name loader name，多 loader 模式下需要，
     * 不提供则使用[默认名称](/miscellaneous/variables.html#DEFAULT_LOADER_NAME)
     * @param config 启动配置，可覆盖 &lt;loader&gt; 标签定义的配置
     */
    show(name?: string, config?: LoaderConfig): Promise<void> {
        return Promise.resolve(true).then(() => {
            if (config && Object.keys(config).length) {
                this.subject.next({ ...config, name: name || DEFAULT_LOADER_NAME, show: true });
            } else {
                this.subject.next(new LoaderOperator({ name: name || DEFAULT_LOADER_NAME, show: true }));
            }
        });
    }

    /**
     * 隐藏指定 loader
     *
     * @param name loader name，多 loader 模式下需要，
     * 不提供则使用[默认名称](/miscellaneous/variables.html#DEFAULT_LOADER_NAME)
     */
    hide(name?: string): Promise<void> {
        return Promise.resolve(true).then(() => {
            this.subject.next(new LoaderOperator({ name: name || DEFAULT_LOADER_NAME, show: false }));
        });
    }
}