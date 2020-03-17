// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { createWebView } from './WebView';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
		vscode.window.showInformationMessage(label);
		const webView = createWebView(context, vscode.ViewColumn.Active, "wxread");
		context.subscriptions.push(webView);
		
	}));

}

// this method is called when your extension is deactivated
export function deactivate() {}
