export function getStyles(): string {
    return `
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .search-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            position: sticky;
            top: 0;
            z-index: 100;
            background: var(--vscode-editor-background);
            padding: 10px 0;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        .search-input {
            flex-grow: 1;
            padding: 8px 12px;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.2s ease;
        }
        .search-input:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
            box-shadow: 0 0 0 1px var(--vscode-focusBorder);
        }
        .search-input::placeholder {
            color: var(--vscode-input-placeholderForeground);
        }
        .button.add-snippet-btn {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background-color 0.2s ease;
            white-space: nowrap;
        }
        .button.add-snippet-btn:hover {
            background: var(--vscode-button-hoverBackground);
        }
        .button.add-snippet-btn:before {
            content: "+";
            font-size: 18px;
            font-weight: 400;
            margin-right: 4px;
        }
        /* Rest of your existing styles... */
        .snippet-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .snippet-card {
            border: 1px solid var(--vscode-panel-border);
            border-radius: 4px;
            padding: 15px;
            background: var(--vscode-editor-background);
        }
        .snippet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .snippet-title {
            font-weight: bold;
            color: var(--vscode-editor-foreground);
        }
        .snippet-description {
            color: var(--vscode-descriptionForeground);
            margin-bottom: 10px;
        }
        .snippet-body {
            background: var(--vscode-textBlockQuote-background);
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            white-space: pre-wrap;
            margin-bottom: 10px;
        }
        .button {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 6px 12px;
            border-radius: 2px;
            cursor: pointer;
            margin: 0 4px;
        }
        .button:hover {
            background: var(--vscode-button-hoverBackground);
        }
        .add-snippet-form {
            display: none;
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid var(--vscode-panel-border);
            border-radius: 4px;
            background: var(--vscode-editor-background);
        }
        .form-group {
            margin-bottom: 10px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 8px;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            font-family: var(--vscode-font-family);
        }
    `;
}