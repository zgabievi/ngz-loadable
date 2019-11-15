/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, ElementRef, EventEmitter, Inject, Injector, Input, Optional, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var moduleFactory, error_1;
            return tslib_1.__generator(this, function (_a) {
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
export { LoadableComponent };
if (false) {
    /** @type {?} */
    LoadableComponent.prototype.module;
    /** @type {?} */
    LoadableComponent.prototype.show;
    /** @type {?} */
    LoadableComponent.prototype.timeout;
    /** @type {?} */
    LoadableComponent.prototype.isElement;
    /** @type {?} */
    LoadableComponent.prototype.init;
    /** @type {?} */
    LoadableComponent.prototype.content;
    /** @type {?} */
    LoadableComponent.prototype.placeholder;
    /** @type {?} */
    LoadableComponent.prototype.loadingTemplate;
    /** @type {?} */
    LoadableComponent.prototype.errorTemplate;
    /** @type {?} */
    LoadableComponent.prototype.timeoutTemplate;
    /**
     * @type {?}
     * @private
     */
    LoadableComponent.prototype.moduleRef;
    /** @type {?} */
    LoadableComponent.prototype.loading;
    /** @type {?} */
    LoadableComponent.prototype.loaded;
    /** @type {?} */
    LoadableComponent.prototype.error;
    /** @type {?} */
    LoadableComponent.prototype.timedOut;
    /** @type {?} */
    LoadableComponent.prototype.timeoutRef;
    /**
     * @type {?}
     * @private
     */
    LoadableComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    LoadableComponent.prototype.loadable;
    /**
     * @type {?}
     * @private
     */
    LoadableComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    LoadableComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxvYWRhYmxlLyIsInNvdXJjZXMiOlsibGliL2xvYWRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFFTixXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFNUU7SUE4REUsRUFBRTtJQUNGLDJCQUdVLE9BQTZCLEVBQzdCLFFBQXlCLEVBQ3pCLFVBQXNCLEVBQ3RCLFFBQWtCO1FBSGxCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs7UUF4RG5CLFNBQUksR0FBRyxLQUFLLENBQUM7O1FBU1osU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7O1FBMEJwQyxZQUFPLEdBQUcsS0FBSyxDQUFDOztRQUdoQixXQUFNLEdBQUcsS0FBSyxDQUFDOztRQUdmLFVBQUssR0FBRyxLQUFLLENBQUM7SUFnQlgsQ0FBQztJQUVKLEVBQUU7Ozs7OztJQUNGLHVDQUFXOzs7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELEVBQUU7Ozs7O0lBQ1csbUNBQU87Ozs7O0lBQXBCOzs7Ozs7d0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ2hCLHNCQUFPO3lCQUNSOzs7O3dCQUd1QixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUF4RCxhQUFhLEdBQUcsU0FBd0M7d0JBRTlELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFFckQsc0JBQU8sYUFBYSxFQUFDOzs7d0JBRXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBSyxDQUFDO3dCQUVuQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FDdEIsSUFBSSxDQUFDLGFBQWE7NEJBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjOzRCQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO3dCQUVGLHNCQUFPLE9BQUssRUFBQzs7Ozs7S0FFaEI7SUFFRCxFQUFFOzs7Ozs7SUFDTSxtQ0FBTzs7Ozs7O0lBQWY7O1lBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFbkQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7O2dCQUMxRCxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsUUFBUSxFQUFFLGlCQUFpQjthQUM1QixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixPQUFPO1NBQ1I7O1lBRUssWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUMzQyxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFdBQVcsQ0FDakI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsRUFBRTs7Ozs7SUFDRixrQ0FBTTs7Ozs7SUFBTjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsRUFBRTs7Ozs7SUFDRixrREFBc0I7Ozs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQ3RCLElBQUksQ0FBQyxlQUFlO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUM5QixJQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7SUFDSixDQUFDO0lBRUQsRUFBRTs7Ozs7SUFDRixrQ0FBTTs7Ozs7SUFBTjtRQUFBLGlCQWtDQztRQWpDQyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUN0QixJQUFJLENBQUMsZUFBZTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQy9CLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVU7OztZQUFDO2dCQUMzQixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEdBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLEVBQUU7WUFDcEIsSUFBSSxLQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixZQUFZLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQy9CO1lBRUQsSUFBSSxFQUFFLFlBQVksS0FBSyxFQUFFO2dCQUN2QixPQUFPO2FBQ1I7WUFFRCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkEvTEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsOEZBR1Q7aUJBRUY7Ozs7Z0RBeURJLFFBQVEsWUFDUixNQUFNLFNBQUMscUJBQXFCO2dCQW5FeEIsZUFBZTtnQkFmdEIsVUFBVTtnQkFHVixRQUFROzs7eUJBd0JQLEtBQUs7dUJBR0wsS0FBSzswQkFHTCxLQUFLOzRCQUdMLEtBQUs7dUJBR0wsTUFBTTswQkFHTixTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBSTdELFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtrQ0FJakUsWUFBWSxTQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQ0FJNUQsWUFBWSxTQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtrQ0FJMUQsWUFBWSxTQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUF1SmhFLHdCQUFDO0NBQUEsQUFoTUQsSUFnTUM7U0F4TFksaUJBQWlCOzs7SUFFNUIsbUNBQXdCOztJQUd4QixpQ0FBc0I7O0lBR3RCLG9DQUFxQzs7SUFHckMsc0NBQTRCOztJQUc1QixpQ0FBb0M7O0lBR3BDLG9DQUMwQjs7SUFHMUIsd0NBQzhCOztJQUc5Qiw0Q0FDa0M7O0lBR2xDLDBDQUNnQzs7SUFHaEMsNENBQ2tDOzs7OztJQUdsQyxzQ0FBb0M7O0lBR3BDLG9DQUFnQjs7SUFHaEIsbUNBQWU7O0lBR2Ysa0NBQWM7O0lBR2QscUNBQWtCOztJQUdsQix1Q0FBZ0I7Ozs7O0lBSWQsb0NBRXFDOzs7OztJQUNyQyxxQ0FBaUM7Ozs7O0lBQ2pDLHVDQUE4Qjs7Ozs7SUFDOUIscUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE5nTW9kdWxlUmVmLFxuICBPbkNoYW5nZXMsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTG9hZGFibGVSb290T3B0aW9ucyB9IGZyb20gJy4vbG9hZGFibGUuY29uZmlnJztcbmltcG9ydCB7IExvYWRhYmxlU2VydmljZSwgTE9BREFCTEVfUk9PVF9PUFRJT05TIH0gZnJvbSAnLi9sb2FkYWJsZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWxvYWRhYmxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI3BsYWNlaG9sZGVyPjwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTG9hZGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvL1xuICBASW5wdXQoKSBtb2R1bGU6IHN0cmluZztcblxuICAvL1xuICBASW5wdXQoKSBzaG93ID0gZmFsc2U7XG5cbiAgLy9cbiAgQElucHV0KCkgdGltZW91dDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIC8vXG4gIEBJbnB1dCgpIGlzRWxlbWVudDogYm9vbGVhbjtcblxuICAvL1xuICBAT3V0cHV0KCkgaW5pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvL1xuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgY29udGVudDogVmlld0NvbnRhaW5lclJlZjtcblxuICAvL1xuICBAVmlld0NoaWxkKCdwbGFjZWhvbGRlcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIHBsYWNlaG9sZGVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIC8vXG4gIEBDb250ZW50Q2hpbGQoJ2xvYWRpbmcnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IGZhbHNlIH0pXG4gIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvL1xuICBAQ29udGVudENoaWxkKCdlcnJvcicsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogZmFsc2UgfSlcbiAgZXJyb3JUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvL1xuICBAQ29udGVudENoaWxkKCd0aW1lZE91dCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogZmFsc2UgfSlcbiAgdGltZW91dFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8vXG4gIHByaXZhdGUgbW9kdWxlUmVmOiBOZ01vZHVsZVJlZjxhbnk+O1xuXG4gIC8vXG4gIGxvYWRpbmcgPSBmYWxzZTtcblxuICAvL1xuICBsb2FkZWQgPSBmYWxzZTtcblxuICAvL1xuICBlcnJvciA9IGZhbHNlO1xuXG4gIC8vXG4gIHRpbWVkT3V0OiBib29sZWFuO1xuXG4gIC8vXG4gIHRpbWVvdXRSZWY6IGFueTtcblxuICAvL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTE9BREFCTEVfUk9PVF9PUFRJT05TKVxuICAgIHByaXZhdGUgb3B0aW9uczogSUxvYWRhYmxlUm9vdE9wdGlvbnMsXG4gICAgcHJpdmF0ZSBsb2FkYWJsZTogTG9hZGFibGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgLy9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnNob3cgJiYgY2hhbmdlcy5zaG93LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMubG9hZGVkKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZEZuKCk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgcHVibGljIGFzeW5jIHByZWxvYWQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMubW9kdWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1vZHVsZUZhY3RvcnkgPSBhd2FpdCB0aGlzLmxvYWRhYmxlLnByZWxvYWQodGhpcy5tb2R1bGUpO1xuXG4gICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICB0aGlzLnRpbWVkT3V0ID0gZmFsc2U7XG4gICAgICB0aGlzLm1vZHVsZVJlZiA9IG1vZHVsZUZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICByZXR1cm4gbW9kdWxlRmFjdG9yeTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuXG4gICAgICB0aGlzLmxvYWRhYmxlLl9yZW5kZXJWQ1IoXG4gICAgICAgIHRoaXMuZXJyb3JUZW1wbGF0ZSB8fFxuICAgICAgICAgIHRoaXMubG9hZGFibGUuZ2V0TW9kdWxlKHRoaXMubW9kdWxlKS5lcnJvckNvbXBvbmVudCB8fFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5lcnJvckNvbXBvbmVudCxcbiAgICAgICAgdGhpcy5jb250ZW50XG4gICAgICApO1xuXG4gICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgcHJpdmF0ZSBfcmVuZGVyKCk6IHZvaWQge1xuICAgIGNvbnN0IG1vZHVsZSA9IHRoaXMubG9hZGFibGUuZ2V0TW9kdWxlKHRoaXMubW9kdWxlKTtcblxuICAgIGlmICh0aGlzLmlzRWxlbWVudCB8fCBtb2R1bGUuaXNFbGVtZW50IHx8IHRoaXMub3B0aW9ucy5pc0VsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChtb2R1bGUubmFtZSk7XG5cbiAgICAgIHRoaXMuaW5pdC5uZXh0KHtcbiAgICAgICAgaW5zdGFuY2U6IGNvbXBvbmVudEluc3RhbmNlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5sb2FkYWJsZS5fcmVuZGVyVkNSKFxuICAgICAgdGhpcy5tb2R1bGVSZWYsXG4gICAgICB0aGlzLmNvbnRlbnQsXG4gICAgICB0aGlzLnBsYWNlaG9sZGVyXG4gICAgKTtcbiAgICB0aGlzLmluaXQubmV4dChjb21wb25lbnRSZWYpO1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgcmVsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMudGltZWRPdXQgPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9hZEZuKCk7XG4gIH1cblxuICAvL1xuICBfcmVuZGVyVGltZW91dFRlbXBsYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudGltZWRPdXQgPSB0cnVlO1xuXG4gICAgdGhpcy5sb2FkYWJsZS5fcmVuZGVyVkNSKFxuICAgICAgdGhpcy50aW1lb3V0VGVtcGxhdGUgfHxcbiAgICAgICAgdGhpcy5sb2FkYWJsZS5nZXRNb2R1bGUodGhpcy5tb2R1bGUpLnRpbWVvdXRUZW1wbGF0ZSB8fFxuICAgICAgICB0aGlzLm9wdGlvbnMudGltZW91dFRlbXBsYXRlLFxuICAgICAgdGhpcy5jb250ZW50XG4gICAgKTtcbiAgfVxuXG4gIC8vXG4gIGxvYWRGbigpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMudGltZW91dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHBhcnNlSW50KHRoaXMudGltZW91dCwgMTApO1xuICAgIH1cblxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICB0aGlzLmxvYWRhYmxlLl9yZW5kZXJWQ1IoXG4gICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSB8fFxuICAgICAgICB0aGlzLmxvYWRhYmxlLmdldE1vZHVsZSh0aGlzLm1vZHVsZSkubG9hZGluZ0NvbXBvbmVudCB8fFxuICAgICAgICB0aGlzLm9wdGlvbnMubG9hZGluZ0NvbXBvbmVudCxcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJcbiAgICApO1xuXG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gMCkge1xuICAgICAgdGhpcy5fcmVuZGVyVGltZW91dFRlbXBsYXRlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRpbWVvdXQgPiAwKSB7XG4gICAgICB0aGlzLnRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVuZGVyVGltZW91dFRlbXBsYXRlKCk7XG4gICAgICB9LCB0aGlzLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMucHJlbG9hZCgpLnRoZW4obWYgPT4ge1xuICAgICAgaWYgKHRoaXMudGltZW91dFJlZikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0UmVmKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1mIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=