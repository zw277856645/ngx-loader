# ngx-loader

Flexible angular loading plugin，width load awesome built-in

## ✨ 插件特性
- 内置 [load awesome](https://github.danielcardoso.net/load-awesome/animations.html)
- 灵活，可自定义 loading 动画模板、loading 文字描述模板、整体布局模板
- 支持全屏和窗口模式
- 支持多个 loader 模式
- 支持延时显示，在响应较快时 loader 不会显示。`(使用 css 延时，不会被 DOM 渲染阻塞)`

## 🔗 链接
- [DOCS](https://zw277856645.github.io/ngx-loader)
- [DEMO](https://zw277856645.github.io/ngx-loader/components/LoaderComponent.html#example)
- [PROJECT](https://github.com/zw277856645/ngx-loader)

## 📦 安装
> npm install @demacia/ngx-loader --save

## 🔨 使用
#### 1. 引入module

``` js
import { LoaderModule } from '@demacia/ngx-loader';

@NgModule({
    imports: [
        LoaderModule
    ]
})
export class AppModule {
}
```

#### 2. 使用方式

``` html
<!-- example.component.html -->
<loader></loader>
```

``` js
\@Component({
    templateUrl: './example.component.html'
})
export class ExampleComponent {

    users: any[];
    
    constructor(private loaderService: LoaderService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.loaderService.show();
        this.userService.getUsers().subscribe(res => {
            this.users = res;
            this.loaderService.hide();
        });
    }

}
```

## 🎨 主要部件导航

**控制中心**
- [LoaderComponent](https://zw277856645.github.io/ngx-loader/components/LoaderComponent.html)

**服务**
- [LoaderService](https://zw277856645.github.io/ngx-loader/injectables/LoaderService.html)

**默认 loading**
- [DotsSlideComponent](https://zw277856645.github.io/ngx-loader/components/DotsSlideComponent.html)

**load awesome**
- [LoadAwesomeComponent](https://zw277856645.github.io/ngx-loader/components/LoadAwesomeComponent.html)
