"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
function activate(context) {
    const provider1 = vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems(document, position, token, context) {
            console.log('document, position, token', document, position, token);
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            // a simple completion item which inserts `Hello World!`
            return new Promise((resolve) => {
                (0, axios_1.default)({
                    method: 'get',
                    url: `http://localhost:5000/api/predict`,
                    withCredentials: false,
                    params: {
                        text: linePrefix
                    },
                }).then((res) => {
                    const simpleCompletion = new vscode.CompletionItem(res.data);
                    resolve([
                        simpleCompletion
                    ]);
                });
            });
        }
    });
    const provider2 = vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `console.`
            // and if so then complete if `log`, `warn`, and `error`
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('console.')) {
                return undefined;
            }
            console.log('tree my console');
            return [
                new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
            ];
        }
    }, '.' // triggered whenever a '.' is being typed
    );
    context.subscriptions.push(provider1, provider2);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map