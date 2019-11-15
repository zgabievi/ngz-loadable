import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoadableService } from './loadable.service';
import { ILoadableConfig, ModuleConfig, ILoadableRootConfig } from './loadable.config';
export declare class LoadableModule {
    static forRoot(config?: ILoadableRootConfig): ModuleWithProviders;
    static forFeature(config?: ILoadableConfig): ModuleWithProviders;
    constructor(ls: LoadableService, configs?: ModuleConfig[][]);
}
