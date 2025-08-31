// KGVS Scripts - script.js

document.getElementById('year').textContent = new Date().getFullYear();
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chat-messages');
const chatText = document.getElementById('chat-text');
const chatSend = document.getElementById('chat-send');

// KGVS Chatbot and Footer Year JS

document.getElementById('year').textContent = new Date().getFullYear();

chatbotToggle.addEventListener('click', () => {
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
});

function appendMessage(text, type) {
  const div = document.createElement('div');
  div.className = type === 'user' ? 'user-msg' : 'bot-msg';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(userText) {
  let reply = "Sorry, I didn't understand that.";
  if (userText.includes('hello') || userText.includes('hi')) {
    reply = "Hello! Welcome to KGVS. We work in rural development, farming, and empowerment.";
  } else if (userText.includes('focus')) {
    reply = "Our focus areas: sustainable farming, women empowerment, SHGs, youth skill development, organic farming.";
  } else if (userText.includes('contact')) {
    reply = "You can reach us at info@kgvs.org or call +91‑XXXXXXXXXX.";
  } else if (userText.includes('program')) {
    reply = "We partner with NABARD, NRLM, and government departments for livelihood programs.";
  }
  appendMessage(reply, 'bot');
}

chatSend.addEventListener('click', () => {
  const text = chatText.value.trim();
  if (text) {
    appendMessage(text, 'user');
    chatText.value = '';
    setTimeout(() => botReply(text.toLowerCase()), 600);
  }
});

chatText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatSend.click();
  }
});
chatbotToggle.addEventListener('click', () => {
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
});
function appendMessage(text, type) {
  const div = document.createElement('div');
  div.className = type === 'user' ? 'user-msg' : 'bot-msg';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function botReply(userText) {
  let reply = "Sorry, I didn't understand that.";
  if (userText.includes('hello') || userText.includes('hi')) {
    reply = "Hello! Welcome to KGVS. We work in rural development, farming, and empowerment.";
  } else if (userText.includes('focus')) {
    reply = "Our focus areas: sustainable farming, women empowerment, SHGs, youth skill development, organic farming.";
  } else if (userText.includes('contact')) {
    reply = "You can reach us at info@kgvs.org or call +91‑XXXXXXXXXX.";
  } else if (userText.includes('program')) {
    reply = "We partner with NABARD, NRLM, and government departments for livelihood programs.";
  }
  appendMessage(reply, 'bot');
}
chatSend.addEventListener('click', () => {
  const text = chatText.value.trim();
  if (text) {
    appendMessage(text, 'user');
    chatText.value = '';
    setTimeout(() => botReply(text.toLowerCase()), 600);
  }
});
chatText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatSend.click();
  }
});
