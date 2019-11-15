/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, Optional, NgModuleFactoryLoader, SystemJsNgModuleLoader, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';
import { LoadableComponent } from './loadable.component';
import { LOADABLE_CONFIG, LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
export class LoadableModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxvYWRhYmxlLyIsInNvdXJjZXMiOlsibGliL2xvYWRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLDRCQUE0QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWE3RixNQUFNLE9BQU8sY0FBYzs7Ozs7SUEwQnpCLFlBQ0UsRUFBbUIsRUFDa0IsVUFBNEIsRUFBRTtRQUVuRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTztTQUNSO1FBRUQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBbENELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBOEIsRUFBRTtRQUM3QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2hGLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN6RSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RFLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDeEUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDcEM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQTBCLEVBQUU7UUFDNUMsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDekUsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN4RSxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQzthQUNwQztTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFsQ0YsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUNqQyxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFO2lCQUNyRTtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUM3Qjs7OztZQVp5QixlQUFlO3dDQXlDcEMsUUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdCwgT3B0aW9uYWwsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgU3lzdGVtSnNOZ01vZHVsZUxvYWRlciwgQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBwcm92aWRlUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgTG9hZGFibGVDb21wb25lbnQgfSBmcm9tICcuL2xvYWRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMT0FEQUJMRV9DT05GSUcsIExvYWRhYmxlU2VydmljZSwgTE9BREFCTEVfUk9PVF9PUFRJT05TIH0gZnJvbSAnLi9sb2FkYWJsZS5zZXJ2aWNlJztcbmltcG9ydCB7IElMb2FkYWJsZUNvbmZpZywgTW9kdWxlQ29uZmlnLCBJTG9hZGFibGVSb290Q29uZmlnIH0gZnJvbSAnLi9sb2FkYWJsZS5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtMb2FkYWJsZUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyIH1cbiAgXSxcbiAgZXhwb3J0czogW0xvYWRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkYWJsZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSUxvYWRhYmxlUm9vdENvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyAge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTG9hZGFibGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBMT0FEQUJMRV9DT05GSUcsIHVzZVZhbHVlOiB7fSwgbXVsdGk6IHRydWUsIGRlcHM6IFtMb2FkYWJsZVNlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTE9BREFCTEVfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnLm1vZHVsZUNvbmZpZ3MsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTE9BREFCTEVfUk9PVF9PUFRJT05TLCB1c2VWYWx1ZTogY29uZmlnLnJvb3RPcHRpb25zIHx8IHt9IH0sXG4gICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgcHJvdmlkZVJvdXRlcyhjb25maWcubW9kdWxlQ29uZmlncyksXG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JGZWF0dXJlKGNvbmZpZzogSUxvYWRhYmxlQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IExvYWRhYmxlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTE9BREFCTEVfQ09ORklHLCB1c2VWYWx1ZToge30sIG11bHRpOiB0cnVlLCBkZXBzOiBbTG9hZGFibGVTZXJ2aWNlXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IExPQURBQkxFX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZy5tb2R1bGVDb25maWdzLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIHVzZVZhbHVlOiBjb25maWcsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHByb3ZpZGVSb3V0ZXMoY29uZmlnLm1vZHVsZUNvbmZpZ3MpLFxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBsczogTG9hZGFibGVTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTE9BREFCTEVfQ09ORklHKSBjb25maWdzOiBNb2R1bGVDb25maWdbXVtdID0gW10sXG4gICkge1xuICAgIGlmICghY29uZmlncykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxzLmFkZENvbmZpZyhjb25maWdzW2NvbmZpZ3MubGVuZ3RoIC0gMV0pO1xuICB9XG59XG4iXX0=