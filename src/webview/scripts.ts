export function getScripts(): string {
    return `
        let currentSnippets = snippets;

        function renderSnippets(snippetsToRender) {
            const container = document.getElementById('snippetContainer');
            container.innerHTML = '';
            
            Object.entries(snippetsToRender).forEach(([name, snippet]) => {
                const card = document.createElement('div');
                card.className = 'snippet-card';
                card.innerHTML = \`
                    <div class="snippet-header">
                        <div class="snippet-title">\${snippet.prefix}</div>
                        <div>
                            <button class="button" onclick="editSnippet('\${name}')">Edit</button>
                            <button class="button" onclick="deleteSnippet('\${name}')">Delete</button>
                        </div>
                    </div>
                    <div class="snippet-description">\${snippet.description}</div>
                    <div class="snippet-body">\${snippet.body.join('\\n')}</div>
                \`;
                container.appendChild(card);
            });
        }

        function filterSnippets(searchText) {
            const filtered = Object.entries(snippets).reduce((acc, [name, snippet]) => {
                if (
                    snippet.prefix.toLowerCase().includes(searchText.toLowerCase()) ||
                    snippet.description.toLowerCase().includes(searchText.toLowerCase()) ||
                    snippet.body.join('\\n').toLowerCase().includes(searchText.toLowerCase())
                ) {
                    acc[name] = snippet;
                }
                return acc;
            }, {});
            currentSnippets = filtered;
            renderSnippets(filtered);
        }

        document.getElementById('searchInput').addEventListener('input', (e) => {
            filterSnippets(e.target.value);
        });

        function toggleAddSnippetForm() {
            const form = document.getElementById('addSnippetForm');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        }

        function submitNewSnippet() {
            const prefix = document.getElementById('snippetPrefix').value;
            const description = document.getElementById('snippetDescription').value;
            const body = document.getElementById('snippetBody').value.split('\\n');

            const snippet = { prefix, description, body };
            vscode.postMessage({ command: 'addSnippet', snippet });
            
            document.getElementById('snippetPrefix').value = '';
            document.getElementById('snippetDescription').value = '';
            document.getElementById('snippetBody').value = '';
            toggleAddSnippetForm();
        }

        function editSnippet(name) {
            const snippet = snippets[name];
            document.getElementById('snippetPrefix').value = snippet.prefix;
            document.getElementById('snippetDescription').value = snippet.description;
            document.getElementById('snippetBody').value = snippet.body.join('\\n');
            
            document.getElementById('addSnippetForm').style.display = 'block';
            
            const submitButton = document.querySelector('#addSnippetForm button');
            submitButton.onclick = () => {
                const editedSnippet = {
                    prefix: document.getElementById('snippetPrefix').value,
                    description: document.getElementById('snippetDescription').value,
                    body: document.getElementById('snippetBody').value.split('\\n')
                };
                vscode.postMessage({ command: 'editSnippet', name, snippet: editedSnippet });
                toggleAddSnippetForm();
            };
        }

        function deleteSnippet(name) {
            // if (confirm('Are you sure you want to delete this snippet?')) {
            vscode.postMessage({ command: 'deleteSnippet', name });
            // }
        }

        function insertSnippet(name) {
            vscode.postMessage({ command: 'insertSnippet', snippet: snippets[name] });
        }

        // Initial render
        renderSnippets(snippets);
    `;
}