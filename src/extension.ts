import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { SnippetWebviewPanel } from './SnippetWebviewPanel';
import { Snippet, SnippetDictionary } from './types';
import { initializeTelemetryReporter, TelemetryLog} from "./telemetry";

export function activate(context: vscode.ExtensionContext) {
    initializeTelemetryReporter(context);
    TelemetryLog('info', 'Extension activated');
    // Register the original quickpick command
    let quickPickDisposable = vscode.commands.registerCommand('react-snippets.showSnippets', async () => {
        TelemetryLog('info', 'Show snippets command invoked');
        try {
            const snippetsPath = path.join(context.extensionPath, 'snippets', 'snippets.json');
            const snippetsContent = fs.readFileSync(snippetsPath, 'utf8');
            const snippets: SnippetDictionary = JSON.parse(snippetsContent);

            const items = Object.entries(snippets).map(([name, snippet]) => ({
                label: `${snippet.prefix}: ${name}`,
                description: snippet.description,
                detail: snippet.body.join('\n'),
                snippet: snippet
            }));

            const selected = await vscode.window.showQuickPick(items, {
                matchOnDescription: true,
                matchOnDetail: true,
                placeHolder: 'Search React snippets...'
            });

            if (selected) {
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    const snippet = new vscode.SnippetString(selected.snippet.body.join('\n'));
                    await editor.insertSnippet(snippet);
                }
            }
        } catch (error) {
            TelemetryLog('error', 'Error loading snippets', { error: (error as Error).message });
            vscode.window.showErrorMessage('Error loading snippets: ' + (error as Error).message);
        }
    });

    // Register the webview command
    let webviewDisposable = vscode.commands.registerCommand('react-snippets.showSnippetsWebview', () => {
        TelemetryLog('info', 'Show snippets webview command invoked');
        SnippetWebviewPanel.createOrShow(context.extensionPath);
    });

    context.subscriptions.push(quickPickDisposable, webviewDisposable);
}

export function deactivate() {
    TelemetryLog('info', 'Extension deactivated');
}