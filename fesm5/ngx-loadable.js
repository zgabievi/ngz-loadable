import { InjectionToken, NgModuleFactory, TemplateRef, Injectable, NgModuleFactoryLoader, ComponentFactoryResolver, Compiler, ɵɵdefineInjectable, ɵɵinject, Component, Optional, Inject, ElementRef, Injector, Input, Output, ViewChild, ViewContainerRef, ContentChild, EventEmitter, ANALYZE_FOR_ENTRY_COMPONENTS, NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { __awaiter, __generator } from 'tslib';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LOADABLE_CONFIG = new InjectionToken('LOADABLE_CONFIG');
/** @type {?} */
var LOADABLE_ROOT_OPTIONS = new InjectionToken('LOADABLE_ROOT_OPTIONS');
/** @type {?} */
var LOG_PREFIX = 'ngx-loadable';
var LoadableService = /** @class */ (function () {
    function LoadableService(loader, cfr, compiler) {
        this.loader = loader;
        this.cfr = cfr;
        this.compiler = compiler;
        this.modules = [];
    }
    /**
     * @param {?} config
     * @return {?}
     */
    LoadableService.prototype.addConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        config.forEach((/**
         * @param {?} newModule
         * @return {?}
         */
        function (newModule) {
            /** @type {?} */
            var existingModule = _this.getModule(newModule.name);
            if (existingModule.loadChildren) {
                console.warn(
                // tslint:disable-next-line:max-line-length
                LOG_PREFIX + " - ModuleConfig with name '" + newModule.name + "' was previously added, it will not be added multiple times, continue...");
            }
            else {
                _this.modules.push(newModule);
                if (newModule.preload) {
                    _this.preload(newModule.name);
                }
            }
        }));
    };
    /**
     * @param {?} module
     * @return {?}
     */
    LoadableService.prototype.getModule = /**
     * @param {?} module
     * @return {?}
     */
    function (module) {
        return this.modules.find((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m.name === module; })) || ((/** @type {?} */ ({})));
    };
    /**
     * @param {?} module
     * @return {?}
     */
    LoadableService.prototype.getModulePath = /**
     * @param {?} module
     * @return {?}
     */
    function (module) {
        return this.getModule(module).loadChildren;
    };
    /**
     * @param {?} module
     * @return {?}
     */
    LoadableService.prototype.preload = /**
     * @param {?} module
     * @return {?}
     */
    function (module) {
        var _this = this;
        /** @type {?} */
        var loadChildren = this.getModulePath(module);
        if (typeof loadChildren === 'string') {
            return this.loader.load(loadChildren);
        }
        else {
            return loadChildren().then((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                if (t instanceof NgModuleFactory) {
                    return t;
                }
                else {
                    return _this.compiler.compileModuleAsync(t);
                }
            }));
        }
    };
    /**
     * @param {?=} modules
     * @return {?}
     */
    LoadableService.prototype.preloadAll = /**
     * @param {?=} modules
     * @return {?}
     */
    function (modules) {
        var _this = this;
        if (!modules) {
            modules = this.modules.map((/**
             * @param {?} m
             * @return {?}
             */
            function (m) { return m.name; }));
        }
        return Promise.all(modules.map((/**
         * @param {?} module
         * @return {?}
         */
        function (module) {
            return _this.preload(module);
        })));
    };
    /**
     * @param {?} mr
     * @param {?} vcr
     * @param {?=} phr
     * @return {?}
     */
    LoadableService.prototype._renderVCR = /**
     * @param {?} mr
     * @param {?} vcr
     * @param {?=} phr
     * @return {?}
     */
    function (mr, vcr, phr) {
        /** @type {?} */
        var factory;
        if (!mr) {
            return;
        }
        if (mr instanceof TemplateRef) {
            vcr.remove();
            return vcr.createEmbeddedView(mr);
        }
        if (((/** @type {?} */ (mr))).componentFactoryResolver) {
            /** @type {?} */
            var rootComponent = ((/** @type {?} */ (mr)))._bootstrapComponents[0];
            factory = ((/** @type {?} */ (mr))).componentFactoryResolver.resolveComponentFactory(rootComponent);
        }
        else {
            factory = this.cfr.resolveComponentFactory((/** @type {?} */ (mr)));
        }
        vcr.remove();
        if (phr) {
            /** @type {?} */
            var phrElement = (/** @type {?} */ (phr.get(0)));
            if (phrElement && phrElement.rootNodes && phrElement.rootNodes[0]) {
                phrElement.rootNodes[0].classList.add('is-disappearing');
            }
            setTimeout((/**
             * @return {?}
             */
            function () {
                phr.remove();
                /** @type {?} */
                var vcrElement = (/** @type {?} */ (phr.get(0)));
                if (vcrElement && vcrElement.rootNodes && vcrElement.rootNodes[0]) {
                    vcrElement.rootNodes[0].classList.add('is-visible');
                }
            }), 1000);
        }
        return vcr.createComponent(factory);
    };
    LoadableService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LoadableService.ctorParameters = function () { return [
        { type: NgModuleFactoryLoader },
        { type: ComponentFactoryResolver },
        { type: Compiler }
    ]; };
    /** @nocollapse */ LoadableService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadableService_Factory() { return new LoadableService(ɵɵinject(NgModuleFactoryLoader), ɵɵinject(ComponentFactoryResolver), ɵɵinject(Compiler)); }, token: LoadableService, providedIn: "root" });
    return LoadableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoadableComponent = /** @class */ (function () {
    //
    function LoadableComponent(options, loadable, elementRef, injector) {
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
    //
    /**
     * @param {?} changes
     * @return {?}
     */
    LoadableComponent.prototype.ngOnChanges = 
    //
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.show && changes.show.currentValue) {
            if (this.loaded) {
                this._render();
                return;
            }
            this.loadFn();
        }
    };
    //
    //
    /**
     * @return {?}
     */
    LoadableComponent.prototype.preload = 
    //
    /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var moduleFactory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.module) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.loadable.preload(this.module)];
                    case 2:
                        moduleFactory = _a.sent();
                        this.loaded = true;
                        this.timedOut = false;
                        this.moduleRef = moduleFactory.create(this.injector);
                        return [2 /*return*/, moduleFactory];
                    case 3:
                        error_1 = _a.sent();
                        this.error = error_1;
                        this.loadable._renderVCR(this.errorTemplate ||
                            this.loadable.getModule(this.module).errorComponent ||
                            this.options.errorComponent, this.content);
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //
    //
    /**
     * @private
     * @return {?}
     */
    LoadableComponent.prototype._render = 
    //
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var module = this.loadable.getModule(this.module);
        if (this.isElement || module.isElement || this.options.isElement) {
            /** @type {?} */
            var componentInstance = document.createElement(module.name);
            this.init.next({
                instance: componentInstance
            });
            this.elementRef.nativeElement.appendChild(componentInstance);
            this.loading = false;
            return;
        }
        /** @type {?} */
        var componentRef = this.loadable._renderVCR(this.moduleRef, this.content, this.placeholder);
        this.init.next(componentRef);
        this.loading = false;
    };
    //
    //
    /**
     * @return {?}
     */
    LoadableComponent.prototype.reload = 
    //
    /**
     * @return {?}
     */
    function () {
        this.timedOut = false;
        this.error = undefined;
        this.loadFn();
    };
    //
    //
    /**
     * @return {?}
     */
    LoadableComponent.prototype._renderTimeoutTemplate = 
    //
    /**
     * @return {?}
     */
    function () {
        this.timedOut = true;
        this.loadable._renderVCR(this.timeoutTemplate ||
            this.loadable.getModule(this.module).timeoutTemplate ||
            this.options.timeoutTemplate, this.content);
    };
    //
    //
    /**
     * @return {?}
     */
    LoadableComponent.prototype.loadFn = 
    //
    /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            function () {
                _this._renderTimeoutTemplate();
            }), this.timeout);
        }
        this.preload().then((/**
         * @param {?} mf
         * @return {?}
         */
        function (mf) {
            if (_this.timeoutRef) {
                clearTimeout(_this.timeoutRef);
            }
            if (mf instanceof Error) {
                return;
            }
            _this.loading = false;
            _this._render();
        }));
    };
    LoadableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-loadable',
                    template: "\n    <ng-template #content></ng-template>\n    <ng-template #placeholder></ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    LoadableComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LOADABLE_ROOT_OPTIONS,] }] },
        { type: LoadableService },
        { type: ElementRef },
        { type: Injector }
    ]; };
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
    return LoadableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoadableModule = /** @class */ (function () {
    function LoadableModule(ls, configs) {
        if (configs === void 0) { configs = []; }
        if (!configs) {
            return;
        }
        ls.addConfig(configs[configs.length - 1]);
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    LoadableModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
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
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    LoadableModule.forFeature = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: LoadableModule,
            providers: [
                { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
                { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                provideRoutes(config.moduleConfigs),
            ]
        };
    };
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
    LoadableModule.ctorParameters = function () { return [
        { type: LoadableService },
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [LOADABLE_CONFIG,] }] }
    ]; };
    return LoadableModule;
}());

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
