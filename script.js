// KGVS Scripts - script.js

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Chatbot functionality (if needed later)
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chat-messages');
const chatText = document.getElementById('chat-text');
const chatSend = document.getElementById('chat-send');

// Initialize chatbot if elements exist
if (chatbotToggle && chatbot && chatMessages && chatText && chatSend) {
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
            reply = "You can reach us at jaipalsinghkgvs@gmail.com or call +91-9413366031, +91-7568304591.";
        } else if (userText.includes('program')) {
            reply = "We partner with NABARD, NRLM, and government departments for livelihood programs.";
        } else if (userText.includes('award')) {
            reply = "We've won several awards including NABARD's SHG Bank Linkage prize and Best Kissan Club awards.";
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
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.card, #thrust li, #awards li').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
