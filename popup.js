document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('clipboardHistory', (data) => {
        const historyDiv = document.getElementById('history');
        const history = data.clipboardHistory || [];

        historyDiv.innerHTML = '';

        history.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-container');
            const textParagraph = document.createElement('p');
            textParagraph.classList.add('item-text');
            textParagraph.textContent = item;

            const btnContainer = document.createElement('div');

            const copyButton = document.createElement('button');

            const copyIcon = document.createElement('img');
            copyIcon.src = './images/copy-icon.svg';
            copyIcon.alt = 'Copy icon';
            copyButton.appendChild(copyIcon);

            // Copy text from clipboardHistory
            copyButton.onclick = () => {
                navigator.clipboard.writeText(item).then(() => {
                    alert('Copied to clipboard: ' + item);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            };

            const deleteButton = document.createElement('button');

            const deleteIcon = document.createElement('img');
            deleteIcon.src = './images/delete-icon.svg';
            deleteIcon.alt = 'Delete icon';
            deleteButton.appendChild(deleteIcon);

            // Delete text from clipboardHistory
            deleteButton.onclick = () => {
                history.splice(index, 1);
                chrome.storage.local.set({ clipboardHistory: history }, () => {
                    itemDiv.remove();
                });
            };

            itemDiv.appendChild(textParagraph);
            btnContainer.appendChild(copyButton);
            btnContainer.appendChild(deleteButton);
            itemDiv.appendChild(btnContainer);
            historyDiv.appendChild(itemDiv);
        });
    });
});