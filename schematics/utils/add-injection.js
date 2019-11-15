"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const find_module_1 = require("../schematics-angular-utils/find-module");
const ts = require("typescript");
const route_utils_1 = require("../schematics-angular-utils/route-utils");
const ast_utils_1 = require("../schematics-angular-utils/ast-utils");
const change_1 = require("../schematics-angular-utils/change");
const find_file_1 = require("./find-file");
const core_1 = require("@angular-devkit/core");
const classify = core_1.strings.classify;
const dasherize = core_1.strings.dasherize;
const camelize = core_1.strings.camelize;
function findFileByName(file, path, host) {
    let dir = host.getDir(path);
    while (dir) {
        const appComponentFileName = dir.path + '/' + file;
        if (host.exists(appComponentFileName)) {
            return appComponentFileName;
        }
        dir = dir.parent;
    }
    throw new schematics_1.SchematicsException(`File ${file} not found in ${path} or one of its anchestors`);
}
function createAddInjectionContext(options, host) {
    const appComponentFileName = findFileByName('app.component.ts', options.path || '/', host);
    const destinationPath = find_file_1.constructDestinationPath(options);
    const serviceName = classify(`${options.name}Service`);
    const serviceFileName = core_1.join(core_1.normalize(destinationPath), `${dasherize(options.name)}.service`);
    const relativeServiceFileName = find_module_1.buildRelativePath(appComponentFileName, serviceFileName);
    return {
        appComponentFileName,
        relativeServiceFileName,
        serviceName
    };
}
function injectServiceIntoAppComponent(options) {
    console.log('injectServiceIntoAppComponent');
    return (host) => {
        const context = createAddInjectionContext(options, host);
        const changes = buildInjectionChanges(context, host, options);
        const declarationRecorder = host.beginUpdate(context.appComponentFileName);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);
        return host;
    };
}
exports.injectServiceIntoAppComponent = injectServiceIntoAppComponent;
function buildInjectionChanges(context, host, options) {
    const text = host.read(context.appComponentFileName);
    if (!text) {
        throw new schematics_1.SchematicsException(`File ${options.module} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const sourceFile = ts.createSourceFile(context.appComponentFileName, sourceText, ts.ScriptTarget.Latest, true);
    const nodes = ast_utils_1.getSourceNodes(sourceFile);
    const ctorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);
    let constructorChange;
    if (!ctorNode) {
        // No constructor found
        constructorChange = createConstructorForInjection(context, nodes, options);
    }
    else {
        constructorChange = addConstructorArgument(context, ctorNode, options);
    }
    return [
        constructorChange,
        route_utils_1.insertImport(sourceFile, context.appComponentFileName, context.serviceName, context.relativeServiceFileName)
    ];
}
function addConstructorArgument(context, ctorNode, options) {
    const siblings = ctorNode.getChildren();
    const parameterListNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);
    if (!parameterListNode) {
        throw new schematics_1.SchematicsException(`expected constructor in ${context.appComponentFileName} to have a parameter list`);
    }
    const parameterNodes = parameterListNode.getChildren();
    const paramNode = parameterNodes.find(p => {
        const typeNode = findSuccessor(p, [ts.SyntaxKind.TypeReference, ts.SyntaxKind.Identifier]);
        if (!typeNode) {
            return false;
        }
        return typeNode.getText() === context.serviceName;
    });
    if (!paramNode && parameterNodes.length === 0) {
        const toAdd = `private ${camelize(context.serviceName)}: ${classify(context.serviceName)}`;
        return new change_1.InsertChange(context.appComponentFileName, parameterListNode.pos, toAdd);
    }
    else if (!paramNode && parameterNodes.length > 0) {
        const toAdd = `,
    private ${camelize(context.serviceName)}: ${classify(context.serviceName)}`;
        const lastParameter = parameterNodes[parameterNodes.length - 1];
        return new change_1.InsertChange(context.appComponentFileName, lastParameter.end, toAdd);
    }
    return new change_1.NoopChange();
}
function findSuccessor(node, searchPath) {
    let children = node.getChildren();
    let next;
    for (const syntaxKind of searchPath) {
        next = children.find(n => n.kind === syntaxKind);
        if (!next) {
            return null;
        }
        children = next.getChildren();
    }
    return next;
}
function createConstructorForInjection(context, nodes, options) {
    const classNode = nodes.find(n => n.kind === ts.SyntaxKind.ClassKeyword);
    if (!classNode) {
        throw new schematics_1.SchematicsException(`expected class in ${context.appComponentFileName}`);
    }
    if (!classNode.parent) {
        throw new schematics_1.SchematicsException(`expected constructor in ${context.appComponentFileName} to have a parent node`);
    }
    let siblings = classNode.parent.getChildren();
    const classIndex = siblings.indexOf(classNode);
    siblings = siblings.slice(classIndex);
    const classIdentifierNode = siblings.find(n => n.kind === ts.SyntaxKind.Identifier);
    if (!classIdentifierNode) {
        throw new schematics_1.SchematicsException(`expected class in ${context.appComponentFileName} to have an identifier`);
    }
    if (classIdentifierNode.getText() !== 'AppComponent') {
        throw new schematics_1.SchematicsException(`expected first class in ${context.appComponentFileName} to have the name AppComponent`);
    }
    const curlyNodeIndex = siblings.findIndex(n => n.kind === ts.SyntaxKind.FirstPunctuation);
    siblings = siblings.slice(curlyNodeIndex);
    const listNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);
    if (!listNode) {
        throw new schematics_1.SchematicsException(`expected first class in ${context.appComponentFileName} to have a body`);
    }
    const toAdd = `
  constructor(private ${camelize(context.serviceName)}: ${classify(context.serviceName)}) {
    // ${camelize(context.serviceName)}.show = true;
  }
`;
    return new change_1.InsertChange(context.appComponentFileName, listNode.pos + 1, toAdd);
}
function showTree(node, depth = 0) {
    const indent = ''.padEnd(depth * 4, ' ');
    console.log(indent + ts.SyntaxKind[node.kind]);
    if (node.getChildCount() === 0) {
        console.log(indent + '    Text: ' + node.getText());
    }
    for (const child of node.getChildren()) {
        showTree(child, depth + 1);
    }
}
//# sourceMappingURL=add-injection.js.map