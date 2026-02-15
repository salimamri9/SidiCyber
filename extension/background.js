const API_URL = "http://localhost:3000/api/analyze";
const API_KEY = "JhYM4alriQHfFIteo6zOsUEn9jZTqNgA"; // Should match your backend EXTENSION_API_KEY

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyzePhishing",
    title: "تحليل النص مع SidiCyber 🛡️",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "analyzePhishing") {
    const selectedText = info.selectionText;

    if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("about:")) {
      return; // Silently ignore on system pages
    }

    // Show a basic indication that we are working
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const div = document.createElement('div');
        div.id = 'sidicyber-loader';
        div.innerText = '🛡️ جاري التحليل...';
        div.style.position = 'fixed';
        div.style.bottom = '20px';
        div.style.right = '20px';
        div.style.backgroundColor = '#ef4444';
        div.style.color = 'white';
        div.style.padding = '10px 20px';
        div.style.borderRadius = '8px';
        div.style.zIndex = '9999';
        div.style.direction = 'rtl';
        document.body.appendChild(div);
      }
    });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'x-extension-key': API_KEY
        },
        body: JSON.stringify({
          message: selectedText,
          contextUrl: tab.url,
          mode: 'extension'
        })
      });

      const data = await response.json();

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (result) => {
          const loader = document.getElementById('sidicyber-loader');
          if (loader) loader.remove();
          
          alert(`🛡️ SidiCyber Analysis:\n\nScore: ${result.riskScore}%\nVerdict: ${result.verdict}\n\nExplanation: ${result.explanation}`);
        },
        args: [data]
      });

    } catch (error) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const loader = document.getElementById('sidicyber-loader');
          if (loader) loader.remove();
          alert("فشل التحليل. تأكد من تشغيل الخادم.");
        }
      });
    }
  }
});
