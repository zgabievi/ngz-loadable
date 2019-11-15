import { InjectionToken, NgModuleFactory, TemplateRef, Injectable, NgModuleFactoryLoader, ComponentFactoryResolver, Compiler, ɵɵdefineInjectable, ɵɵinject, EventEmitter, Component, Optional, Inject, ElementRef, Injector, Input, Output, ViewChild, ViewContainerRef, ContentChild, ANALYZE_FOR_ENTRY_COMPONENTS, NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LOADABLE_CONFIG = new InjectionToken('LOADABLE_CONFIG');
/** @type {?} */
const LOADABLE_ROOT_OPTIONS = new InjectionToken('LOADABLE_ROOT_OPTIONS');
/** @type {?} */
const LOG_PREFIX = 'ngx-loadable';
class LoadableService {
    /**
     * @param {?} loader
     * @param {?} cfr
     * @param {?} compiler
     */
    constructor(loader, cfr, compiler) {
        this.loader = loader;
        this.cfr = cfr;
        this.compiler = compiler;
        this.modules = [];
    }
    /**
     * @param {?} config
     * @return {?}
     */
    addConfig(config) {
        config.forEach((/**
         * @param {?} newModule
         * @return {?}
         */
        newModule => {
            /** @type {?} */
            const existingModule = this.getModule(newModule.name);
            if (existingModule.loadChildren) {
                console.warn(
                // tslint:disable-next-line:max-line-length
                `${LOG_PREFIX} - ModuleConfig with name '${newModule.name}' was previously added, it will not be added multiple times, continue...`);
            }
            else {
                this.modules.push(newModule);
                if (newModule.preload) {
                    this.preload(newModule.name);
                }
            }
        }));
    }
    /**
     * @param {?} module
     * @return {?}
     */
    getModule(module) {
        return this.modules.find((/**
         * @param {?} m
         * @return {?}
         */
        m => m.name === module)) || ((/** @type {?} */ ({})));
    }
    /**
     * @param {?} module
     * @return {?}
     */
    getModulePath(module) {
        return this.getModule(module).loadChildren;
    }
    /**
     * @param {?} module
     * @return {?}
     */
    preload(module) {
        /** @type {?} */
        const loadChildren = this.getModulePath(module);
        if (typeof loadChildren === 'string') {
            return this.loader.load(loadChildren);
        }
        else {
            return loadChildren().then((/**
             * @param {?} t
             * @return {?}
             */
            (t) => {
                if (t instanceof NgModuleFactory) {
                    return t;
                }
                else {
                    return this.compiler.compileModuleAsync(t);
                }
            }));
        }
    }
    /**
     * @param {?=} modules
     * @return {?}
     */
    preloadAll(modules) {
        if (!modules) {
            modules = this.modules.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m.name));
        }
        return Promise.all(modules.map((/**
         * @param {?} module
         * @return {?}
         */
        module => {
            return this.preload(module);
        })));
    }
    /**
     * @param {?} mr
     * @param {?} vcr
     * @param {?=} phr
     * @return {?}
     */
    _renderVCR(mr, vcr, phr) {
        /** @type {?} */
        let factory;
        if (!mr) {
            return;
        }
        if (mr instanceof TemplateRef) {
            vcr.remove();
            return vcr.createEmbeddedView(mr);
        }
        if (((/** @type {?} */ (mr))).componentFactoryResolver) {
            /** @type {?} */
            const rootComponent = ((/** @type {?} */ (mr)))._bootstrapComponents[0];
            factory = ((/** @type {?} */ (mr))).componentFactoryResolver.resolveComponentFactory(rootComponent);
        }
        else {
            factory = this.cfr.resolveComponentFactory((/** @type {?} */ (mr)));
        }
        vcr.remove();
        if (phr) {
            /** @type {?} */
            const phrElement = (/** @type {?} */ (phr.get(0)));
            if (phrElement && phrElement.rootNodes && phrElement.rootNodes[0]) {
                phrElement.rootNodes[0].classList.add('is-disappearing');
            }
            setTimeout((/**
             * @return {?}
             */
            () => {
                phr.remove();
                /** @type {?} */
                const vcrElement = (/** @type {?} */ (phr.get(0)));
                if (vcrElement && vcrElement.rootNodes && vcrElement.rootNodes[0]) {
                    vcrElement.rootNodes[0].classList.add('is-visible');
                }
            }), 1000);
        }
        return vcr.createComponent(factory);
    }
}
LoadableService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LoadableService.ctorParameters = () => [
    { type: NgModuleFactoryLoader },
    { type: ComponentFactoryResolver },
    { type: Compiler }
];
/** @nocollapse */ LoadableService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadableService_Factory() { return new LoadableService(ɵɵinject(NgModuleFactoryLoader), ɵɵinject(ComponentFactoryResolver), ɵɵinject(Compiler)); }, token: LoadableService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoadableComponent {
    //
    /**
     * @param {?} options
     * @param {?} loadable
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(options, loadable, elementRef, injector) {
        this.options = options;
        this.loadable = loadable;
        this.elementRef = elementRef;
        this.injector = injector;
        //
        this.show = false;
        //
        this.init = new EventEmitter();
        //
        this.loading = false;
        //
        this.loaded = false;
        //
        this.error = false;
    }
    //
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.show && changes.show.currentValue) {
            if (this.loaded) {
                this._render();
                return;
            }
            this.loadFn();
        }
    }
    //
    /**
     * @return {?}
     */
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.module) {
                return;
            }
            try {
                /** @type {?} */
                const moduleFactory = yield this.loadable.preload(this.module);
                this.loaded = true;
                this.timedOut = false;
                this.moduleRef = moduleFactory.create(this.injector);
                return moduleFactory;
            }
            catch (error) {
                this.error = error;
                this.loadable._renderVCR(this.errorTemplate ||
                    this.loadable.getModule(this.module).errorComponent ||
                    this.options.errorComponent, this.content);
                return error;
            }
        });
    }
    //
    /**
     * @private
     * @return {?}
     */
    _render() {
        /** @type {?} */
        const module = this.loadable.getModule(this.module);
        if (this.isElement || module.isElement || this.options.isElement) {
            /** @type {?} */
            const componentInstance = document.createElement(module.name);
            this.init.next({
                instance: componentInstance
            });
            this.elementRef.nativeElement.appendChild(componentInstance);
            this.loading = false;
            return;
        }
        /** @type {?} */
        const componentRef = this.loadable._renderVCR(this.moduleRef, this.content, this.placeholder);
        this.init.next(componentRef);
        this.loading = false;
    }
    //
    /**
     * @return {?}
     */
    reload() {
        this.timedOut = false;
        this.error = undefined;
        this.loadFn();
    }
    //
    /**
     * @return {?}
     */
    _renderTimeoutTemplate() {
        this.timedOut = true;
        this.loadable._renderVCR(this.timeoutTemplate ||
            this.loadable.getModule(this.module).timeoutTemplate ||
            this.options.timeoutTemplate, this.content);
    }
    //
    /**
     * @return {?}
     */
    loadFn() {
        if (typeof this.timeout === 'string') {
            this.timeout = parseInt(this.timeout, 10);
        }
        this.loading = true;
        this.loadable._renderVCR(this.loadingTemplate ||
            this.loadable.getModule(this.module).loadingComponent ||
            this.options.loadingComponent, this.placeholder);
        if (this.timeout === 0) {
            this._renderTimeoutTemplate();
        }
        else if (this.timeout > 0) {
            this.timeoutRef = setTimeout((/**
             * @return {?}
             */
            () => {
                this._renderTimeoutTemplate();
            }), this.timeout);
        }
        this.preload().then((/**
         * @param {?} mf
         * @return {?}
         */
        mf => {
            if (this.timeoutRef) {
                clearTimeout(this.timeoutRef);
            }
            if (mf instanceof Error) {
                return;
            }
            this.loading = false;
            this._render();
        }));
    }
}
LoadableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-loadable',
                template: `
    <ng-template #content></ng-template>
    <ng-template #placeholder></ng-template>
  `
            }] }
];
/** @nocollapse */
LoadableComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LOADABLE_ROOT_OPTIONS,] }] },
    { type: LoadableService },
    { type: ElementRef },
    { type: Injector }
];
LoadableComponent.propDecorators = {
    module: [{ type: Input }],
    show: [{ type: Input }],
    timeout: [{ type: Input }],
    isElement: [{ type: Input }],
    init: [{ type: Output }],
    content: [{ type: ViewChild, args: ['content', { read: ViewContainerRef, static: true },] }],
    placeholder: [{ type: ViewChild, args: ['placeholder', { read: ViewContainerRef, static: true },] }],
    loadingTemplate: [{ type: ContentChild, args: ['loading', { read: TemplateRef, static: false },] }],
    errorTemplate: [{ type: ContentChild, args: ['error', { read: TemplateRef, static: false },] }],
    timeoutTemplate: [{ type: ContentChild, args: ['timedOut', { read: TemplateRef, static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoadableModule {
    /**
     * @param {?} ls
     * @param {?=} configs
     */
    constructor(ls, configs = []) {
        if (!configs) {
            return;
        }
        ls.addConfig(configs[configs.length - 1]);
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: LoadableModule,
            providers: [
                { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
                { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
                { provide: LOADABLE_ROOT_OPTIONS, useValue: config.rootOptions || {} },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                provideRoutes(config.moduleConfigs),
            ]
        };
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forFeature(config = {}) {
        return {
            ngModule: LoadableModule,
            providers: [
                { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
                { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                provideRoutes(config.moduleConfigs),
            ]
        };
    }
}
LoadableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LoadableComponent],
                imports: [
                    CommonModule
                ],
                providers: [
                    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
                ],
                exports: [LoadableComponent]
            },] }
];
/** @nocollapse */
LoadableModule.ctorParameters = () => [
    { type: LoadableService },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [LOADABLE_CONFIG,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function matcher() {
    return null;
}

export { LOADABLE_CONFIG, LOADABLE_ROOT_OPTIONS, LoadableComponent, LoadableModule, LoadableService, matcher };
//# sourceMappingURL=ngx-loadable.js.map
