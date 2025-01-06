let clipboardHistory = [];

chrome.storage.local.get('clipboardHistory', (data) => {
    clipboardHistory = data.clipboardHistory || [];
});

document.addEventListener('copy', (event) => {
    try {
        event.preventDefault();
        const selectedText = window.getSelection().toString();
        if (!clipboardHistory.includes(selectedText)) {
            clipboardHistory.push(selectedText);

            // Limit to last 10 items
            if (clipboardHistory.length > 10) {
                clipboardHistory.shift();
            }

            // Save history to local storage
            chrome.storage.local.set({ clipboardHistory });
        }
        event.clipboardData.setData('text/plain', selectedText);
    } catch (error) {
        console.error('Error during copy event:', error);
    }
});