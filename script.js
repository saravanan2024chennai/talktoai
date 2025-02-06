document.getElementById('sendButton').addEventListener('click', function() {
    const prompt = document.getElementById('promptInput').value;

    if (!prompt) {
        alert('Please enter a prompt.');
        return;
    }

    document.getElementById('errorContainer').style.display = 'none';
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('responseContainer').innerHTML = '';

    const url = 'https://api.groq.com/openai/v1/chat/completions';  // Correct Groq cloud endpoint
    const apiKey = '';  // Replace with your actual Groq API key
    const data = {
        model: 'llama-3.3-70b-versatile',  // Replace with the specific model you're using on Groq
        messages: [{
            role: 'user',
            content: prompt
        }],
        temperature: 1,  // Optional, adjust as needed
        max_completion_tokens: 1024,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('responseContainer').innerText = data.choices[0].message.content;
    })
    .catch(error => {
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('errorContainer').style.display = 'block';
        console.error('Error:', error);
    });
});
