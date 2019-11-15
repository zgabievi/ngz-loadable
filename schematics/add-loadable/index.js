"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("../schematics-angular-utils/config");
const core_1 = require("@angular-devkit/core");
const ast_utils_1 = require("../schematics-angular-utils/ast-utils");
const change_1 = require("../schematics-angular-utils/change");
const ts = require("typescript");
function addDeclarationToNgModule(options, projectPath) {
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
        const relativePath = 'ngx-loadable';
        const moduleName = core_1.strings.classify(`${options.name}Module`);
        const changes = ast_utils_1.addImportToModule(source, modulePath, moduleName, relativePath, `${moduleName}.forRoot({\n\t\t\tmoduleConfigs: []\n\t\t})`);
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
function default_1(options) {
    return (host, context) => {
        const workspace = config_1.getWorkspace(host);
        // const projectSpecified = options.project !== undefined;
        if (!options.project) {
            options.project = Object.keys(workspace.projects)[0];
        }
        const project = workspace.projects[options.project];
        const root = `/${project.root}/src/`;
        const projectDirName = 'app';
        const projectPath = `${root}${projectDirName}`;
        // console.log('root--', project.root, projectPath, options.module);
        options.module = `${projectPath}/${options.module}`;
        // if (options.module) {
        //   options.module = findModuleFromOptions(host, options);
        // }
        return schematics_1.chain([
            // addPackageJsonDependencies(projectSpecified, project.root),
            // installPackageJsonDependencies(),
            addDeclarationToNgModule(options, projectPath),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map