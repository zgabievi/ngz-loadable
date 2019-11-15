/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, ElementRef, EventEmitter, Inject, Injector, Input, Optional, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
export class LoadableComponent {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxvYWRhYmxlLyIsInNvdXJjZXMiOlsibGliL2xvYWRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFFTixXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFVNUUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7SUF1RDVCLFlBR1UsT0FBNkIsRUFDN0IsUUFBeUIsRUFDekIsVUFBc0IsRUFDdEIsUUFBa0I7UUFIbEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVOztRQXhEbkIsU0FBSSxHQUFHLEtBQUssQ0FBQzs7UUFTWixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUEwQnBDLFlBQU8sR0FBRyxLQUFLLENBQUM7O1FBR2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7O1FBR2YsVUFBSyxHQUFHLEtBQUssQ0FBQztJQWdCWCxDQUFDOzs7Ozs7SUFHSixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7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LEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFJN0QsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzhCQUlqRSxZQUFZLFNBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzRCQUk1RCxZQUFZLFNBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzhCQUkxRCxZQUFZLFNBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7O0lBL0I5RCxtQ0FBd0I7O0lBR3hCLGlDQUFzQjs7SUFHdEIsb0NBQXFDOztJQUdyQyxzQ0FBNEI7O0lBRzVCLGlDQUFvQzs7SUFHcEMsb0NBQzBCOztJQUcxQix3Q0FDOEI7O0lBRzlCLDRDQUNrQzs7SUFHbEMsMENBQ2dDOztJQUdoQyw0Q0FDa0M7Ozs7O0lBR2xDLHNDQUFvQzs7SUFHcEMsb0NBQWdCOztJQUdoQixtQ0FBZTs7SUFHZixrQ0FBYzs7SUFHZCxxQ0FBa0I7O0lBR2xCLHVDQUFnQjs7Ozs7SUFJZCxvQ0FFcUM7Ozs7O0lBQ3JDLHFDQUFpQzs7Ozs7SUFDakMsdUNBQThCOzs7OztJQUM5QixxQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgTmdNb2R1bGVSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElMb2FkYWJsZVJvb3RPcHRpb25zIH0gZnJvbSAnLi9sb2FkYWJsZS5jb25maWcnO1xuaW1wb3J0IHsgTG9hZGFibGVTZXJ2aWNlLCBMT0FEQUJMRV9ST09UX09QVElPTlMgfSBmcm9tICcuL2xvYWRhYmxlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtbG9hZGFibGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD48L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjcGxhY2Vob2xkZXI+PC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8vXG4gIEBJbnB1dCgpIG1vZHVsZTogc3RyaW5nO1xuXG4gIC8vXG4gIEBJbnB1dCgpIHNob3cgPSBmYWxzZTtcblxuICAvL1xuICBASW5wdXQoKSB0aW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgLy9cbiAgQElucHV0KCkgaXNFbGVtZW50OiBib29sZWFuO1xuXG4gIC8vXG4gIEBPdXRwdXQoKSBpbml0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIC8vXG4gIEBWaWV3Q2hpbGQoJ3BsYWNlaG9sZGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgcGxhY2Vob2xkZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLy9cbiAgQENvbnRlbnRDaGlsZCgnbG9hZGluZycsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogZmFsc2UgfSlcbiAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8vXG4gIEBDb250ZW50Q2hpbGQoJ2Vycm9yJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiBmYWxzZSB9KVxuICBlcnJvclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8vXG4gIEBDb250ZW50Q2hpbGQoJ3RpbWVkT3V0JywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiBmYWxzZSB9KVxuICB0aW1lb3V0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLy9cbiAgcHJpdmF0ZSBtb2R1bGVSZWY6IE5nTW9kdWxlUmVmPGFueT47XG5cbiAgLy9cbiAgbG9hZGluZyA9IGZhbHNlO1xuXG4gIC8vXG4gIGxvYWRlZCA9IGZhbHNlO1xuXG4gIC8vXG4gIGVycm9yID0gZmFsc2U7XG5cbiAgLy9cbiAgdGltZWRPdXQ6IGJvb2xlYW47XG5cbiAgLy9cbiAgdGltZW91dFJlZjogYW55O1xuXG4gIC8vXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChMT0FEQUJMRV9ST09UX09QVElPTlMpXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBJTG9hZGFibGVSb290T3B0aW9ucyxcbiAgICBwcml2YXRlIGxvYWRhYmxlOiBMb2FkYWJsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICAvL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuc2hvdyAmJiBjaGFuZ2VzLnNob3cuY3VycmVudFZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZWQpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2FkRm4oKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICBwdWJsaWMgYXN5bmMgcHJlbG9hZCgpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICghdGhpcy5tb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbW9kdWxlRmFjdG9yeSA9IGF3YWl0IHRoaXMubG9hZGFibGUucHJlbG9hZCh0aGlzLm1vZHVsZSk7XG5cbiAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudGltZWRPdXQgPSBmYWxzZTtcbiAgICAgIHRoaXMubW9kdWxlUmVmID0gbW9kdWxlRmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgIHJldHVybiBtb2R1bGVGYWN0b3J5O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG5cbiAgICAgIHRoaXMubG9hZGFibGUuX3JlbmRlclZDUihcbiAgICAgICAgdGhpcy5lcnJvclRlbXBsYXRlIHx8XG4gICAgICAgICAgdGhpcy5sb2FkYWJsZS5nZXRNb2R1bGUodGhpcy5tb2R1bGUpLmVycm9yQ29tcG9uZW50IHx8XG4gICAgICAgICAgdGhpcy5vcHRpb25zLmVycm9yQ29tcG9uZW50LFxuICAgICAgICB0aGlzLmNvbnRlbnRcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvL1xuICBwcml2YXRlIF9yZW5kZXIoKTogdm9pZCB7XG4gICAgY29uc3QgbW9kdWxlID0gdGhpcy5sb2FkYWJsZS5nZXRNb2R1bGUodGhpcy5tb2R1bGUpO1xuXG4gICAgaWYgKHRoaXMuaXNFbGVtZW50IHx8IG1vZHVsZS5pc0VsZW1lbnQgfHwgdGhpcy5vcHRpb25zLmlzRWxlbWVudCkge1xuICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG1vZHVsZS5uYW1lKTtcblxuICAgICAgdGhpcy5pbml0Lm5leHQoe1xuICAgICAgICBpbnN0YW5jZTogY29tcG9uZW50SW5zdGFuY2VcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChjb21wb25lbnRJbnN0YW5jZSk7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmxvYWRhYmxlLl9yZW5kZXJWQ1IoXG4gICAgICB0aGlzLm1vZHVsZVJlZixcbiAgICAgIHRoaXMuY29udGVudCxcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJcbiAgICApO1xuICAgIHRoaXMuaW5pdC5uZXh0KGNvbXBvbmVudFJlZik7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICAvL1xuICByZWxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lZE91dCA9IGZhbHNlO1xuICAgIHRoaXMuZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2FkRm4oKTtcbiAgfVxuXG4gIC8vXG4gIF9yZW5kZXJUaW1lb3V0VGVtcGxhdGUoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lZE91dCA9IHRydWU7XG5cbiAgICB0aGlzLmxvYWRhYmxlLl9yZW5kZXJWQ1IoXG4gICAgICB0aGlzLnRpbWVvdXRUZW1wbGF0ZSB8fFxuICAgICAgICB0aGlzLmxvYWRhYmxlLmdldE1vZHVsZSh0aGlzLm1vZHVsZSkudGltZW91dFRlbXBsYXRlIHx8XG4gICAgICAgIHRoaXMub3B0aW9ucy50aW1lb3V0VGVtcGxhdGUsXG4gICAgICB0aGlzLmNvbnRlbnRcbiAgICApO1xuICB9XG5cbiAgLy9cbiAgbG9hZEZuKCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdGhpcy50aW1lb3V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy50aW1lb3V0ID0gcGFyc2VJbnQodGhpcy50aW1lb3V0LCAxMCk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIHRoaXMubG9hZGFibGUuX3JlbmRlclZDUihcbiAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlIHx8XG4gICAgICAgIHRoaXMubG9hZGFibGUuZ2V0TW9kdWxlKHRoaXMubW9kdWxlKS5sb2FkaW5nQ29tcG9uZW50IHx8XG4gICAgICAgIHRoaXMub3B0aW9ucy5sb2FkaW5nQ29tcG9uZW50LFxuICAgICAgdGhpcy5wbGFjZWhvbGRlclxuICAgICk7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSAwKSB7XG4gICAgICB0aGlzLl9yZW5kZXJUaW1lb3V0VGVtcGxhdGUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudGltZW91dCA+IDApIHtcbiAgICAgIHRoaXMudGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW5kZXJUaW1lb3V0VGVtcGxhdGUoKTtcbiAgICAgIH0sIHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgdGhpcy5wcmVsb2FkKCkudGhlbihtZiA9PiB7XG4gICAgICBpZiAodGhpcy50aW1lb3V0UmVmKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRSZWYpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWYgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==