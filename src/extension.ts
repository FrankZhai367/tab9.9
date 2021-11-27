/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {

	const provider1 = vscode.languages.registerCompletionItemProvider('javascript', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			console.log('document, position, token', document, position, token);
			const linePrefix = document.lineAt(position).text.substr(0, position.character);
			// a simple completion item which inserts `Hello World!`
			return new Promise((resolve) => {
				axios({
					method: 'get',
					url: `http://localhost:5000/api/predict`,
					withCredentials: false,
					params: {
						text: linePrefix
					},
				}).then((res:any) => {
					const simpleCompletion = new vscode.CompletionItem(res.data);
					resolve([
						simpleCompletion
					]);
				});
			});
		}
	});

	const provider2 = vscode.languages.registerCompletionItemProvider(
		'javascript',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

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
		},
		'.' // triggered whenever a '.' is being typed
	);

	context.subscriptions.push(provider1, provider2);
}
