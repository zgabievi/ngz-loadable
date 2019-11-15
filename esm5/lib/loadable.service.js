/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:max-line-length
import { Compiler, ComponentFactoryResolver, Injectable, InjectionToken, NgModuleFactory, NgModuleFactoryLoader, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/** @type {?} */
export var LOADABLE_CONFIG = new InjectionToken('LOADABLE_CONFIG');
/** @type {?} */
export var LOADABLE_ROOT_OPTIONS = new InjectionToken('LOADABLE_ROOT_OPTIONS');
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
    /** @nocollapse */ LoadableService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadableService_Factory() { return new LoadableService(i0.ɵɵinject(i0.NgModuleFactoryLoader), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.Compiler)); }, token: LoadableService, providedIn: "root" });
    return LoadableService;
}());
export { LoadableService };
if (false) {
    /** @type {?} */
    LoadableService.prototype.modules;
    /**
     * @type {?}
     * @private
     */
    LoadableService.prototype.loader;
    /**
     * @type {?}
     * @private
     */
    LoadableService.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    LoadableService.prototype.compiler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1sb2FkYWJsZS8iLCJzb3VyY2VzIjpbImxpYi9sb2FkYWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUNMLFFBQVEsRUFDUix3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLGNBQWMsRUFDZCxlQUFlLEVBQ2YscUJBQXFCLEVBRXJCLFdBQVcsRUFHWixNQUFNLGVBQWUsQ0FBQzs7O0FBR3ZCLE1BQU0sS0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQy9DLGlCQUFpQixDQUNsQjs7QUFDRCxNQUFNLEtBQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQ3JELHVCQUF1QixDQUN4Qjs7SUFFSyxVQUFVLEdBQUcsY0FBYztBQUVqQztJQUtFLHlCQUNVLE1BQTZCLEVBQzdCLEdBQTZCLEVBQzdCLFFBQWtCO1FBRmxCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQzdCLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFKckIsWUFBTyxHQUFtQixFQUFFLENBQUM7SUFLakMsQ0FBQzs7Ozs7SUFFSixtQ0FBUzs7OztJQUFULFVBQVUsTUFBc0I7UUFBaEMsaUJBZUM7UUFkQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsU0FBUzs7Z0JBQ2hCLGNBQWMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDckQsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFO2dCQUMvQixPQUFPLENBQUMsSUFBSTtnQkFDViwyQ0FBMkM7Z0JBQ3hDLFVBQVUsbUNBQThCLFNBQVMsQ0FBQyxJQUFJLDZFQUEwRSxDQUNwSSxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLElBQUksU0FBUyxDQUFDLE9BQU8sRUFB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LENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUMxRDtZQUVELFVBQVU7OztZQUFDO2dCQUNULEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7b0JBRVAsVUFBVSxHQUFHLG1CQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQU87Z0JBRXBDLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDakUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNyRDtZQUNILENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztTQUNWO1FBRUQsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dCQTVHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQW5CQyxxQkFBcUI7Z0JBSnJCLHdCQUF3QjtnQkFEeEIsUUFBUTs7OzBCQUZWO0NBcUlDLEFBN0dELElBNkdDO1NBMUdZLGVBQWU7OztJQUMxQixrQ0FBb0M7Ozs7O0lBRWxDLGlDQUFxQzs7Ozs7SUFDckMsOEJBQXFDOzs7OztJQUNyQyxtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5pbXBvcnQge1xuICBDb21waWxlcixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgTmdNb2R1bGVGYWN0b3J5LFxuICBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsXG4gIE5nTW9kdWxlUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElMb2FkYWJsZVJvb3RPcHRpb25zLCBNb2R1bGVDb25maWcgfSBmcm9tICcuL2xvYWRhYmxlLmNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBMT0FEQUJMRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48TW9kdWxlQ29uZmlnW10+KFxuICAnTE9BREFCTEVfQ09ORklHJ1xuKTtcbmV4cG9ydCBjb25zdCBMT0FEQUJMRV9ST09UX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SUxvYWRhYmxlUm9vdE9wdGlvbnM+KFxuICAnTE9BREFCTEVfUk9PVF9PUFRJT05TJ1xuKTtcblxuY29uc3QgTE9HX1BSRUZJWCA9ICduZ3gtbG9hZGFibGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2FkYWJsZVNlcnZpY2Uge1xuICBwdWJsaWMgbW9kdWxlczogTW9kdWxlQ29uZmlnW10gPSBbXTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlcixcbiAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyXG4gICkge31cblxuICBhZGRDb25maWcoY29uZmlnOiBNb2R1bGVDb25maWdbXSkge1xuICAgIGNvbmZpZy5mb3JFYWNoKG5ld01vZHVsZSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZ01vZHVsZSA9IHRoaXMuZ2V0TW9kdWxlKG5ld01vZHVsZS5uYW1lKTtcbiAgICAgIGlmIChleGlzdGluZ01vZHVsZS5sb2FkQ2hpbGRyZW4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICBgJHtMT0dfUFJFRklYfSAtIE1vZHVsZUNvbmZpZyB3aXRoIG5hbWUgJyR7bmV3TW9kdWxlLm5hbWV9JyB3YXMgcHJldmlvdXNseSBhZGRlZCwgaXQgd2lsbCBub3QgYmUgYWRkZWQgbXVsdGlwbGUgdGltZXMsIGNvbnRpbnVlLi4uYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb2R1bGVzLnB1c2gobmV3TW9kdWxlKTtcbiAgICAgICAgaWYgKG5ld01vZHVsZS5wcmVsb2FkKSB7XG4gICAgICAgICAgdGhpcy5wcmVsb2FkKG5ld01vZHVsZS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TW9kdWxlKG1vZHVsZTogc3RyaW5nKTogTW9kdWxlQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmZpbmQobSA9PiBtLm5hbWUgPT09IG1vZHVsZSkgfHwgKHt9IGFzIE1vZHVsZUNvbmZpZyk7XG4gIH1cblxuICBnZXRNb2R1bGVQYXRoKG1vZHVsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TW9kdWxlKG1vZHVsZSkubG9hZENoaWxkcmVuO1xuICB9XG5cbiAgcHJlbG9hZChtb2R1bGU6IHN0cmluZyk6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PGFueT4+IHtcbiAgICBjb25zdCBsb2FkQ2hpbGRyZW4gPSB0aGlzLmdldE1vZHVsZVBhdGgobW9kdWxlKTtcbiAgICBpZiAodHlwZW9mIGxvYWRDaGlsZHJlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRlci5sb2FkKGxvYWRDaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb2FkQ2hpbGRyZW4oKS50aGVuKCh0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHQgaW5zdGFuY2VvZiBOZ01vZHVsZUZhY3RvcnkpIHtcbiAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb21waWxlci5jb21waWxlTW9kdWxlQXN5bmModCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZWxvYWRBbGwobW9kdWxlcz86IHN0cmluZ1tdKTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55PltdPiB7XG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICBtb2R1bGVzID0gdGhpcy5tb2R1bGVzLm1hcChtID0+IG0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIG1vZHVsZXMubWFwKG1vZHVsZSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWxvYWQobW9kdWxlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJWQ1IoXG4gICAgbXI6IE5nTW9kdWxlUmVmPGFueT4gfCBUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwaHI/OiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIGxldCBmYWN0b3J5OiBhbnk7XG5cbiAgICBpZiAoIW1yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1yIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHZjci5yZW1vdmUoKTtcbiAgICAgIHJldHVybiB2Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KG1yKTtcbiAgICB9XG5cbiAgICBpZiAoKG1yIGFzIE5nTW9kdWxlUmVmPGFueT4pLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgICAgY29uc3Qgcm9vdENvbXBvbmVudCA9IChtciBhcyBhbnkpLl9ib290c3RyYXBDb21wb25lbnRzWzBdO1xuICAgICAgZmFjdG9yeSA9IChtciBhcyBOZ01vZHVsZVJlZjxcbiAgICAgICAgYW55XG4gICAgICA+KS5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnkocm9vdENvbXBvbmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhY3RvcnkgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShtciBhcyBUeXBlPGFueT4pO1xuICAgIH1cblxuICAgIHZjci5yZW1vdmUoKTtcblxuICAgIGlmIChwaHIpIHtcbiAgICAgIGNvbnN0IHBockVsZW1lbnQgPSBwaHIuZ2V0KDApIGFzIGFueTtcblxuICAgICAgaWYgKHBockVsZW1lbnQgJiYgcGhyRWxlbWVudC5yb290Tm9kZXMgJiYgcGhyRWxlbWVudC5yb290Tm9kZXNbMF0pIHtcbiAgICAgICAgcGhyRWxlbWVudC5yb290Tm9kZXNbMF0uY2xhc3NMaXN0LmFkZCgnaXMtZGlzYXBwZWFyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwaHIucmVtb3ZlKCk7XG5cbiAgICAgICAgY29uc3QgdmNyRWxlbWVudCA9IHBoci5nZXQoMCkgYXMgYW55O1xuXG4gICAgICAgIGlmICh2Y3JFbGVtZW50ICYmIHZjckVsZW1lbnQucm9vdE5vZGVzICYmIHZjckVsZW1lbnQucm9vdE5vZGVzWzBdKSB7XG4gICAgICAgICAgdmNyRWxlbWVudC5yb290Tm9kZXNbMF0uY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmNyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgfVxufVxuIl19