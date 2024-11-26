import {SnippetDictionary} from "../types";
import {getStyles} from "./styles";
import {getScripts} from "./scripts";

export function getWebviewContent(snippets: SnippetDictionary): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Snippets</title>
        <style>
            ${getStyles()}
        </style>
    </head>
    <body>
        <div class="search-container">
            <input type="text" id="searchInput" class="search-input" placeholder="Search snippets...">
            <button class="button add-snippet-btn" onclick="toggleAddSnippetForm()">Add New Snippet</button>
        </div>

        <div id="addSnippetForm" class="add-snippet-form">
            <div class="form-group">
                <label for="snippetPrefix">Prefix:</label>
                <input type="text" id="snippetPrefix" required>
            </div>
            <div class="form-group">
                <label for="snippetDescription">Description:</label>
                <input type="text" id="snippetDescription" required>
            </div>
            <div class="form-group">
                <label for="snippetBody">Body:</label>
                <textarea id="snippetBody" rows="5" required></textarea>
            </div>
            <button class="button" onclick="submitNewSnippet()">Save Snippet</button>
            <button class="button" onclick="toggleAddSnippetForm()">Cancel</button>
        </div>

        <div class="snippet-container" id="snippetContainer"></div>

        <script>
            const vscode = acquireVsCodeApi();
            const snippets = ${JSON.stringify(snippets)};
            ${getScripts()}
        </script>
    </body>
    </html>`;
}