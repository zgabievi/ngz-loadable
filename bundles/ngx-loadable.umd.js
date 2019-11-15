(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('ngx-loadable', ['exports', '@angular/core', '@angular/common', '@angular/router'], factory) :
    (global = global || self, factory(global['ngx-loadable'] = {}, global.ng.core, global.ng.common, global.ng.router));
}(this, function (exports, core, common, router) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LOADABLE_CONFIG = new core.InjectionToken('LOADABLE_CONFIG');
    /** @type {?} */
    var LOADABLE_ROOT_OPTIONS = new core.InjectionToken('LOADABLE_ROOT_OPTIONS');
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
                    if (t instanceof core.NgModuleFactory) {
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
            if (mr instanceof core.TemplateRef) {
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        LoadableService.ctorParameters = function () { return [
            { type: core.NgModuleFactoryLoader },
            { type: core.ComponentFactoryResolver },
            { type: core.Compiler }
        ]; };
        /** @nocollapse */ LoadableService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function LoadableService_Factory() { return new LoadableService(core.ɵɵinject(core.NgModuleFactoryLoader), core.ɵɵinject(core.ComponentFactoryResolver), core.ɵɵinject(core.Compiler)); }, token: LoadableService, providedIn: "root" });
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
            this.init = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'ngx-loadable',
                        template: "\n    <ng-template #content></ng-template>\n    <ng-template #placeholder></ng-template>\n  "
                    }] }
        ];
        /** @nocollapse */
        LoadableComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LOADABLE_ROOT_OPTIONS,] }] },
            { type: LoadableService },
            { type: core.ElementRef },
            { type: core.Injector }
        ]; };
        LoadableComponent.propDecorators = {
            module: [{ type: core.Input }],
            show: [{ type: core.Input }],
            timeout: [{ type: core.Input }],
            isElement: [{ type: core.Input }],
            init: [{ type: core.Output }],
            content: [{ type: core.ViewChild, args: ['content', { read: core.ViewContainerRef, static: true },] }],
            placeholder: [{ type: core.ViewChild, args: ['placeholder', { read: core.ViewContainerRef, static: true },] }],
            loadingTemplate: [{ type: core.ContentChild, args: ['loading', { read: core.TemplateRef, static: false },] }],
            errorTemplate: [{ type: core.ContentChild, args: ['error', { read: core.TemplateRef, static: false },] }],
            timeoutTemplate: [{ type: core.ContentChild, args: ['timedOut', { read: core.TemplateRef, static: false },] }]
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
                    { provide: core.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                    router.provideRoutes(config.moduleConfigs),
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
                    { provide: core.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                    router.provideRoutes(config.moduleConfigs),
                ]
            };
        };
        LoadableModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [LoadableComponent],
                        imports: [
                            common.CommonModule
                        ],
                        providers: [
                            { provide: core.NgModuleFactoryLoader, useClass: core.SystemJsNgModuleLoader }
                        ],
                        exports: [LoadableComponent]
                    },] }
        ];
        /** @nocollapse */
        LoadableModule.ctorParameters = function () { return [
            { type: LoadableService },
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LOADABLE_CONFIG,] }] }
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

    exports.LOADABLE_CONFIG = LOADABLE_CONFIG;
    exports.LOADABLE_ROOT_OPTIONS = LOADABLE_ROOT_OPTIONS;
    exports.LoadableComponent = LoadableComponent;
    exports.LoadableModule = LoadableModule;
    exports.LoadableService = LoadableService;
    exports.matcher = matcher;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-loadable.umd.js.map
