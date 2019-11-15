"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
const ast_utils_1 = require("../schematics-angular-utils/ast-utils");
const change_1 = require("../schematics-angular-utils/change");
const find_module_1 = require("../schematics-angular-utils/find-module");
const parse_name_1 = require("../schematics-angular-utils/parse-name");
const config_1 = require("../schematics-angular-utils/config");
function buildRelativeModulePath(options, modulePath) {
    const importModulePath = core_1.normalize(`/${options.path}/`
        + (options.flat ? '' : core_1.strings.dasherize(options.name) + '/')
        + core_1.strings.dasherize(options.name)
        + '.module');
    return find_module_1.buildRelativePath(modulePath, importModulePath);
}
function addDeclarationToNgModule(options) {
    return (host) => {
        if (!options.module) {
            return host;
        }
        const modulePath = options.module;
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString();
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const relativePath = buildRelativeModulePath(options, modulePath);
        const changes = ast_utils_1.addImportToModule(source, modulePath, core_1.strings.classify(`${options.name}Module`), relativePath);
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function addRouteDeclarationToNgModule(options, routingModulePath) {
    return (host) => {
        if (!options.module) {
            throw new Error('Module option required when creating a lazy loaded routing module.');
        }
        let path;
        if (routingModulePath) {
            path = routingModulePath;
        }
        else {
            path = options.module;
        }
        const text = host.read(path);
        if (!text) {
            throw new Error(`Couldn't find the module nor its routing module.`);
        }
        const sourceText = text.toString();
        const addDeclaration = ast_utils_1.addRouteDeclarationToModule(ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true), path, buildRoute(options, options.module));
        const recorder = host.beginUpdate(path);
        recorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);
        host.commitUpdate(recorder);
        return host;
    };
}
function getRoutingModulePath(host, modulePath) {
    const routingModulePath = modulePath.endsWith(find_module_1.ROUTING_MODULE_EXT)
        ? modulePath
        : modulePath.replace(find_module_1.MODULE_EXT, find_module_1.ROUTING_MODULE_EXT);
    return host.exists(routingModulePath) ? core_1.normalize(routingModulePath) : undefined;
}
function buildRoute(options, modulePath) {
    const relativeModulePath = buildRelativeModulePath(options, modulePath);
    const moduleName = `${core_1.strings.classify(options.name)}Module`;
    const loadChildren = `() => import('${relativeModulePath}').then(m => m.${moduleName})`;
    if (options.element) {
        return `{ name: '${options.selector}', loadChildren: ${loadChildren}, matcher, isElement: true }`;
    }
    return `{ name: '${options.name}', loadChildren: ${loadChildren}, matcher }`;
}
function default_1(options) {
    return (host) => {
        if (options.path === undefined) {
            const workspace = config_1.getWorkspace(host);
            if (!options.project) {
                options.project = Object.keys(workspace.projects)[0];
            }
            const project = workspace.projects[options.project];
            options.selector = options.selector || buildSelector(options, project && project.prefix || '');
            const root = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/`;
            const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
            options.path = `${root}${projectDirName}`;
        }
        if (options.module) {
            options.module = find_module_1.findModuleFromOptions(host, options);
        }
        const routingModulePath = undefined;
        const isLazyLoadedModuleGen = options.route && options.module;
        // if (isLazyLoadedModuleGen) {
        //   options.routingScope = RoutingScope.Child;
        //   routingModulePath = getRoutingModulePath(host, options.module as string);
        // }
        const parsedPath = parse_name_1.parseName(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.filter(path => !path.endsWith('-routing.module.ts.template')),
            schematics_1.applyTemplates(Object.assign({}, core_1.strings, { 'if-flat': (s) => options.flat ? '' : s, lazyRoute: true, lazyRouteWithoutRouteModule: true, lazyRouteWithRouteModule: false }, options)),
            schematics_1.move(parsedPath.path),
        ]);
        const moduleDasherized = core_1.strings.dasherize(options.name);
        const modulePath = `${!options.flat ? moduleDasherized + '/' : ''}${moduleDasherized}.module.ts`;
        return schematics_1.chain([
            // addDeclarationToNgModule(options),
            addRouteDeclarationToNgModule(options, routingModulePath),
            schematics_1.mergeWith(templateSource),
            schematics_1.schematic('component', Object.assign({}, options, { module: modulePath })),
        ]);
    };
}
exports.default = default_1;
function buildSelector(options, projectPrefix) {
    let selector = core_1.strings.dasherize(options.name);
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    }
    else if (options.prefix === undefined && projectPrefix) {
        selector = `${projectPrefix}-${selector}`;
    }
    return selector;
}
//# sourceMappingURL=index.js.map