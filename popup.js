// Copy text from local storage
function copyText(item) {
    return () => {
        navigator.clipboard.writeText(item).then(() => {
            alert('Copied to clipboard: ' + item);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };
}

// Delete text from local storage
function deleteText(index, itemDiv) {
    return () => {
        chrome.storage.local.get('clipboardHistory', (data) => {
            const history = data.clipboardHistory || [];
            history.splice(index, 1);
            chrome.storage.local.set({ clipboardHistory: history }, () => {
                itemDiv.remove();
            });
        });
    };
}


//  Create new button that uses svg icon and accepts a function
function createButton(path, desc, action) {
    const button = document.createElement('button');
    const imgIcon = document.createElement('img');

    imgIcon.src = path;
    imgIcon.alt = desc;

    button.appendChild(imgIcon);

    button.onclick = action;

    return button;
}

//  Appends multiple children to a parent in one line
function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child))
}

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

            const copyButton = createButton('./images/copy-icon.svg', 'Copy icon', copyText(item));

            const deleteButton = createButton('./images/delete-icon.svg', 'Delete icon', deleteText(index, itemDiv));

            appendChildren(btnContainer, [copyButton, deleteButton]);
            appendChildren(itemDiv, [textParagraph, btnContainer]);
            appendChildren(historyDiv, [itemDiv]);
        });
    });
});

