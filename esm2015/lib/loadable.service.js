/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:max-line-length
import { Compiler, ComponentFactoryResolver, Injectable, InjectionToken, NgModuleFactory, NgModuleFactoryLoader, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/** @type {?} */
export const LOADABLE_CONFIG = new InjectionToken('LOADABLE_CONFIG');
/** @type {?} */
export const LOADABLE_ROOT_OPTIONS = new InjectionToken('LOADABLE_ROOT_OPTIONS');
/** @type {?} */
const LOG_PREFIX = 'ngx-loadable';
export class LoadableService {
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
/** @nocollapse */ LoadableService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadableService_Factory() { return new LoadableService(i0.ɵɵinject(i0.NgModuleFactoryLoader), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.Compiler)); }, token: LoadableService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1sb2FkYWJsZS8iLCJzb3VyY2VzIjpbImxpYi9sb2FkYWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUNMLFFBQVEsRUFDUix3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLGNBQWMsRUFDZCxlQUFlLEVBQ2YscUJBQXFCLEVBRXJCLFdBQVcsRUFHWixNQUFNLGVBQWUsQ0FBQzs7O0FBR3ZCLE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQy9DLGlCQUFpQixDQUNsQjs7QUFDRCxNQUFNLE9BQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQ3JELHVCQUF1QixDQUN4Qjs7TUFFSyxVQUFVLEdBQUcsY0FBYztBQUtqQyxNQUFNLE9BQU8sZUFBZTs7Ozs7O0lBRTFCLFlBQ1UsTUFBNkIsRUFDN0IsR0FBNkIsRUFDN0IsUUFBa0I7UUFGbEIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUpyQixZQUFPLEdBQW1CLEVBQUUsQ0FBQztJQUtqQyxDQUFDOzs7OztJQUVKLFNBQVMsQ0FBQyxNQUFzQjtRQUM5QixNQUFNLENBQUMsT0FBTzs7OztRQUFDLFNBQVMsQ0FBQyxFQUFFOztrQkFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNyRCxJQUFJLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxJQUFJO2dCQUNWLDJDQUEyQztnQkFDM0MsR0FBRyxVQUFVLDhCQUE4QixTQUFTLENBQUMsSUFBSSwwRUFBMEUsQ0FDcEksQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLFNBQVMsQ0FB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LENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzFEO1lBRUQsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7c0JBRVAsVUFBVSxHQUFHLG1CQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQU87Z0JBRXBDLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDakUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNyRDtZQUNILENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztTQUNWO1FBRUQsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQTVHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFuQkMscUJBQXFCO1lBSnJCLHdCQUF3QjtZQUR4QixRQUFROzs7OztJQTBCUixrQ0FBb0M7Ozs7O0lBRWxDLGlDQUFxQzs7Ozs7SUFDckMsOEJBQXFDOzs7OztJQUNyQyxtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5pbXBvcnQge1xuICBDb21waWxlcixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgTmdNb2R1bGVGYWN0b3J5LFxuICBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsXG4gIE5nTW9kdWxlUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElMb2FkYWJsZVJvb3RPcHRpb25zLCBNb2R1bGVDb25maWcgfSBmcm9tICcuL2xvYWRhYmxlLmNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBMT0FEQUJMRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48TW9kdWxlQ29uZmlnW10+KFxuICAnTE9BREFCTEVfQ09ORklHJ1xuKTtcbmV4cG9ydCBjb25zdCBMT0FEQUJMRV9ST09UX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SUxvYWRhYmxlUm9vdE9wdGlvbnM+KFxuICAnTE9BREFCTEVfUk9PVF9PUFRJT05TJ1xuKTtcblxuY29uc3QgTE9HX1BSRUZJWCA9ICduZ3gtbG9hZGFibGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2FkYWJsZVNlcnZpY2Uge1xuICBwdWJsaWMgbW9kdWxlczogTW9kdWxlQ29uZmlnW10gPSBbXTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlcixcbiAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyXG4gICkge31cblxuICBhZGRDb25maWcoY29uZmlnOiBNb2R1bGVDb25maWdbXSkge1xuICAgIGNvbmZpZy5mb3JFYWNoKG5ld01vZHVsZSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZ01vZHVsZSA9IHRoaXMuZ2V0TW9kdWxlKG5ld01vZHVsZS5uYW1lKTtcbiAgICAgIGlmIChleGlzdGluZ01vZHVsZS5sb2FkQ2hpbGRyZW4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICBgJHtMT0dfUFJFRklYfSAtIE1vZHVsZUNvbmZpZyB3aXRoIG5hbWUgJyR7bmV3TW9kdWxlLm5hbWV9JyB3YXMgcHJldmlvdXNseSBhZGRlZCwgaXQgd2lsbCBub3QgYmUgYWRkZWQgbXVsdGlwbGUgdGltZXMsIGNvbnRpbnVlLi4uYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb2R1bGVzLnB1c2gobmV3TW9kdWxlKTtcbiAgICAgICAgaWYgKG5ld01vZHVsZS5wcmVsb2FkKSB7XG4gICAgICAgICAgdGhpcy5wcmVsb2FkKG5ld01vZHVsZS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TW9kdWxlKG1vZHVsZTogc3RyaW5nKTogTW9kdWxlQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmZpbmQobSA9PiBtLm5hbWUgPT09IG1vZHVsZSkgfHwgKHt9IGFzIE1vZHVsZUNvbmZpZyk7XG4gIH1cblxuICBnZXRNb2R1bGVQYXRoKG1vZHVsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TW9kdWxlKG1vZHVsZSkubG9hZENoaWxkcmVuO1xuICB9XG5cbiAgcHJlbG9hZChtb2R1bGU6IHN0cmluZyk6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PGFueT4+IHtcbiAgICBjb25zdCBsb2FkQ2hpbGRyZW4gPSB0aGlzLmdldE1vZHVsZVBhdGgobW9kdWxlKTtcbiAgICBpZiAodHlwZW9mIGxvYWRDaGlsZHJlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRlci5sb2FkKGxvYWRDaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb2FkQ2hpbGRyZW4oKS50aGVuKCh0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHQgaW5zdGFuY2VvZiBOZ01vZHVsZUZhY3RvcnkpIHtcbiAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb21waWxlci5jb21waWxlTW9kdWxlQXN5bmModCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZWxvYWRBbGwobW9kdWxlcz86IHN0cmluZ1tdKTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55PltdPiB7XG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICBtb2R1bGVzID0gdGhpcy5tb2R1bGVzLm1hcChtID0+IG0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIG1vZHVsZXMubWFwKG1vZHVsZSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWxvYWQobW9kdWxlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJWQ1IoXG4gICAgbXI6IE5nTW9kdWxlUmVmPGFueT4gfCBUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwaHI/OiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIGxldCBmYWN0b3J5OiBhbnk7XG5cbiAgICBpZiAoIW1yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1yIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHZjci5yZW1vdmUoKTtcbiAgICAgIHJldHVybiB2Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KG1yKTtcbiAgICB9XG5cbiAgICBpZiAoKG1yIGFzIE5nTW9kdWxlUmVmPGFueT4pLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgICAgY29uc3Qgcm9vdENvbXBvbmVudCA9IChtciBhcyBhbnkpLl9ib290c3RyYXBDb21wb25lbnRzWzBdO1xuICAgICAgZmFjdG9yeSA9IChtciBhcyBOZ01vZHVsZVJlZjxcbiAgICAgICAgYW55XG4gICAgICA+KS5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnkocm9vdENvbXBvbmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhY3RvcnkgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShtciBhcyBUeXBlPGFueT4pO1xuICAgIH1cblxuICAgIHZjci5yZW1vdmUoKTtcblxuICAgIGlmIChwaHIpIHtcbiAgICAgIGNvbnN0IHBockVsZW1lbnQgPSBwaHIuZ2V0KDApIGFzIGFueTtcblxuICAgICAgaWYgKHBockVsZW1lbnQgJiYgcGhyRWxlbWVudC5yb290Tm9kZXMgJiYgcGhyRWxlbWVudC5yb290Tm9kZXNbMF0pIHtcbiAgICAgICAgcGhyRWxlbWVudC5yb290Tm9kZXNbMF0uY2xhc3NMaXN0LmFkZCgnaXMtZGlzYXBwZWFyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwaHIucmVtb3ZlKCk7XG5cbiAgICAgICAgY29uc3QgdmNyRWxlbWVudCA9IHBoci5nZXQoMCkgYXMgYW55O1xuXG4gICAgICAgIGlmICh2Y3JFbGVtZW50ICYmIHZjckVsZW1lbnQucm9vdE5vZGVzICYmIHZjckVsZW1lbnQucm9vdE5vZGVzWzBdKSB7XG4gICAgICAgICAgdmNyRWxlbWVudC5yb290Tm9kZXNbMF0uY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmNyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgfVxufVxuIl19