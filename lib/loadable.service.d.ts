import { Compiler, ComponentFactoryResolver, InjectionToken, NgModuleFactory, NgModuleFactoryLoader, NgModuleRef, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { ILoadableRootOptions, ModuleConfig } from './loadable.config';
export declare const LOADABLE_CONFIG: InjectionToken<ModuleConfig[]>;
export declare const LOADABLE_ROOT_OPTIONS: InjectionToken<ILoadableRootOptions>;
export declare class LoadableService {
    private loader;
    private cfr;
    private compiler;
    modules: ModuleConfig[];
    constructor(loader: NgModuleFactoryLoader, cfr: ComponentFactoryResolver, compiler: Compiler);
    addConfig(config: ModuleConfig[]): void;
    getModule(module: string): ModuleConfig;
    getModulePath(module: string): string | import("./loadable.config").FunctionReturningPromise;
    preload(module: string): Promise<NgModuleFactory<any>>;
    preloadAll(modules?: string[]): Promise<NgModuleFactory<any>[]>;
    _renderVCR(mr: NgModuleRef<any> | Type<any> | TemplateRef<any>, vcr: ViewContainerRef, phr?: ViewContainerRef): import("@angular/core").EmbeddedViewRef<any> | import("@angular/core").ComponentRef<unknown>;
}
