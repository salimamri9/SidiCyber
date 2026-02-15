const API_URL = "http://localhost:3000/api/analyze"; // Update this to your deployed Azure URL
const API_KEY = "JhYM4alriQHfFIteo6zOsUEn9jZTqNgA"; // Matching the key in your .env

document.getElementById('analyze-btn').addEventListener('click', async () => {
    const btn = document.getElementById('analyze-btn');
    const loading = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const instruction = document.getElementById('instruction');
    const errorMsg = document.getElementById('error-msg');

    try {
        // 1. Get selected text from tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Check if we are on a restricted page (chrome://, edge://, about:, etc.)
        if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("about:")) {
            errorMsg.innerText = "لا يمكن تحليل نصوص على صفحات النظام الخاصة بالمتصفح. يرجى تجربة الإضافة على موقع ويب عادي.";
            return;
        }
        
        const selection = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString(),
        });

        const text = selection[0].result;

        if (!text || text.trim().length < 5) {
            errorMsg.innerText = "يرجى تظليل نص أطول للتحليل (أكثر من 5 أحرف).";
            return;
        }

        // 2. Prepare UI
        btn.style.display = 'none';
        instruction.style.display = 'none';
        loading.style.display = 'block';
        errorMsg.innerText = "";

        // 3. Call SidiCyber Backend
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors', // Explicitly set cors mode
            headers: {
                'Content-Type': 'application/json',
                'x-extension-key': API_KEY
            },
            body: JSON.stringify({
                message: text,
                contextUrl: tab.url,
                mode: 'extension'
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Server Error:", response.status, errorData);
            throw new Error(errorData.error || 'فشل الاتصال بالخادم');
        }

        const data = await response.json();

        // 4. Show Results
        loading.style.display = 'none';
        resultDiv.style.display = 'block';
        
        const scoreVal = document.getElementById('score-val');
        scoreVal.innerText = `${data.riskScore}%`;
        
        // Color coding score
        if (data.riskScore > 70) scoreVal.style.color = '#dc2626';
        else if (data.riskScore > 30) scoreVal.style.color = '#f59e0b';
        else scoreVal.style.color = '#16a34a';

        document.getElementById('verdict-val').innerText = data.verdict;
        document.getElementById('explanation-val').innerText = data.explanation;

    } catch (err) {
        loading.style.display = 'none';
        btn.style.display = 'block';
        instruction.style.display = 'block';
        errorMsg.innerText = "حدث خطأ: " + err.message;
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    window.location.reload();
});
