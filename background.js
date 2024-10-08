// Listener for when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  // Check if the URL is valid and not a chrome:// URL
  if (tab.url && !tab.url.startsWith('chrome://')) {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
      });
  }
});
