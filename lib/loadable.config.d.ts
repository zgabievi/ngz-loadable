import { Type } from '@angular/core';
export declare type FunctionReturningPromise = () => Promise<any>;
export interface ModuleConfig {
    name: string;
    loadChildren?: string | FunctionReturningPromise;
    matcher: () => null;
    loadingComponent?: Type<any>;
    errorComponent?: Type<any>;
    timeoutTemplate?: Type<any>;
    isElement?: boolean;
    preload?: boolean;
}
export interface ILoadableRootOptions {
    loadingComponent?: Type<any>;
    errorComponent?: Type<any>;
    timeoutTemplate?: Type<any>;
    isElement?: boolean;
    preload?: boolean;
}
export interface ILoadableConfig {
    moduleConfigs?: ModuleConfig[];
}
export interface ILoadableRootConfig {
    moduleConfigs?: ModuleConfig[];
    rootOptions?: ILoadableRootOptions;
}
