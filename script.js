document.addEventListener('DOMContentLoaded', function() {

// ===== DATA =====
const teachers = [
    { name: "Faqeer Muhammad",       role: "Principal",                    highlight: true },
    { name: "Zafar Abbas Usman",     role: "SST — Biology & Chemistry"                    },
    { name: "Muhammad Iqbal Nadeem", role: "SST — Mathematics & Physics"                  },
    { name: "Tasawar Shahzad",       role: "SSE — Physics & Mathematics"                  },
    { name: "Raza Ul Hassan",        role: "SST — Mathematics & Physics"                  },
    { name: "Ahmad Ali",             role: "EST — Urdu & Islamiyat"                        },
    { name: "Nazeer Ahmad Azhar",    role: "EST — Urdu & Social Studies"                  },
    { name: "Nasrullah Khan",        role: "EST — English"                                },
    { name: "Irfan Haider",          role: "SST — Chemistry"                              },
    { name: "Javed Hussain",         role: "SSE — English"                                },
    { name: "Mehndi Hussain",        role: "EST — Mathematics"                            },
    { name: "Muhammad Qaiser Shahzad", role: "SESE — Science"                            },
    { name: "Tahir Awais",           role: "EST — Science"                                },
    { name: "Nawaz Mona",            role: "EST — Urdu"                                   },
    { name: "Akhtar Ali",            role: "EST — Computer Science"                       },
    { name: "Nasir Zia",             role: "PT Teacher — Sports & Physical Education"     }
];

const positionHolders = [
    { rank: 1, name: "Meesum Hayat", marks: 1153 },
    { rank: 2, name: "Muhammad Faizan", marks: 1146 },
    { rank: 3, name: "Sohail Haider Munawar", marks: 1118 },
    { rank: 4, name: "Muhammad Mudassar Hassan", marks: 1108 },
    { rank: 5, name: "Muhammad Sharjeel Zaheer", marks: 1100 }
];

const facilities = [
    { icon: "🔬", name: "Science Laboratory" },
    { icon: "💻", name: "Computer Laboratory" },
    { icon: "📚", name: "Classes 6th to 10th" },
    { icon: "🏏", name: "Cricket Ground" },
    { icon: "⚽", name: "Football Ground" },
    { icon: "💧", name: "Clean Drinking Water" },
    { icon: "⚡", name: "Electricity" },
    { icon: "🧱", name: "Boundary Wall & Main Gate" }
];

const galleryImages = [
    /* =====================================================
       GALLERY PHOTOS — HOW TO ADD YOUR REAL PHOTOS:
       1. Go to https://imgbb.com
       2. Upload each photo
       3. Copy the "Direct Link" for each
       4. Replace each 'YOUR_PHOTO_X_LINK' below
       ===================================================== */
    { src: "https://i.ibb.co/yn9WLW9q/3.jpg", alt: "School Front View" },
    { src: "https://i.ibb.co/qM1v55H0/4.jpg", alt: "School Logo Mural" },
    { src: "https://i.ibb.co/TxnD2n1t/1.jpg", alt: "Sports & Activities" },
    { src: "https://i.ibb.co/0yFfK0n7/2.jpg", alt: "Annual Results 2025" },
    { src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", alt: "Science Laboratory" },
    { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80", alt: "Computer Laboratory" }
];

// ===== RENDER FUNCTIONS =====
function renderTeachers() {
    const grid = document.getElementById('teachersGrid');
    const initials = (name) => name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const VISIBLE = 8;

    function buildCard(t, i, hidden) {
        return `
        <div class="teacher-card ${t.highlight ? 'principal-highlight' : ''} animate-on-scroll delay-${(i % 4) + 1}${hidden ? ' teacher-hidden' : ''}"${hidden ? ' style="display:none;"' : ''}>
            <div class="teacher-avatar">
                <img src="https://placehold.co/120x120/${t.highlight ? 'C9A84C/006400' : '006400/ffffff'}?text=${initials(t.name)}" alt="${t.name}">
            </div>
            <h4>${t.name}</h4>
            <span class="teacher-badge">${t.role}</span>
        </div>`;
    }

    const visibleCards  = teachers.slice(0, VISIBLE).map((t, i) => buildCard(t, i, false)).join('');
    const hiddenCards   = teachers.slice(VISIBLE).map((t, i) => buildCard(t, i, true)).join('');
    const remaining     = teachers.length - VISIBLE;

    const toggleBtns = remaining > 0 ? `
        <div style="grid-column:1/-1;text-align:center;margin-top:16px;display:flex;gap:12px;justify-content:center;">
            <button id="showMoreBtn" onclick="window.toggleTeachers(true)"
                style="background:linear-gradient(135deg,var(--green),var(--green-light));color:white;border:none;padding:12px 32px;border-radius:50px;font-family:'Poppins',sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 15px rgba(0,100,0,0.3);">
                Show More (${remaining} more teachers)
            </button>
            <button id="showLessBtn" onclick="window.toggleTeachers(false)"
                style="display:none;background:#f0f0f0;color:#333;border:none;padding:12px 32px;border-radius:50px;font-family:'Poppins',sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;">
                Show Less
            </button>
        </div>` : '';

    grid.innerHTML = visibleCards + hiddenCards + toggleBtns;
}

window.toggleTeachers = function(showAll) {
    document.querySelectorAll('.teacher-hidden').forEach(el => {
        el.style.display = showAll ? '' : 'none';
    });
    const moreBtn = document.getElementById('showMoreBtn');
    const lessBtn = document.getElementById('showLessBtn');
    if (moreBtn) moreBtn.style.display = showAll ? 'none' : '';
    if (lessBtn) lessBtn.style.display = showAll ? '' : 'none';
};

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = positionHolders.map(p => {
        let cls = p.rank <= 3 ? `rank-${p.rank}` : 'rank-other';
        let medal = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : '';
        return `
            <tr>
                <td><span class="rank-badge ${cls}">${p.rank}</span></td>
                <td>${medal} ${p.name}</td>
                <td><strong>${p.marks}</strong></td>
            </tr>
        `;
    }).join('');
}

function renderFacilities() {
    const grid = document.getElementById('facilitiesGrid');
    grid.innerHTML = facilities.map((f, i) => `
        <div class="facility-card animate-on-scroll delay-${(i % 5) + 1}">
            <span class="icon">${f.icon}</span>
            <h4>${f.name}</h4>
        </div>
    `).join('');
}

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = galleryImages.map((img, i) => `
        <div class="gallery-item animate-on-scroll delay-${(i % 3) + 1}" onclick="openLightbox('${img.src}')">
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
        </div>
    `).join('');
}

// ===== INIT RENDERS =====
renderTeachers();
renderLeaderboard();
renderFacilities();
renderGallery();

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobile() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobile);
mobileOverlay.addEventListener('click', toggleMobile);

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) toggleMobile();
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar shadow
    navbar.classList.toggle('scrolled', scrollY > 50);
    
    // Back to top
    backToTop.classList.toggle('visible', scrollY > 500);
    
    // Active nav link
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top) current = section.getAttribute('id');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ===== LIGHTBOX =====
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ===== ADMISSION FORM WITH WEBHOOK =====
async function handleAdmission(e) {
    e.preventDefault();
    const name   = document.getElementById('studentName').value.trim();
    const cls    = document.getElementById('classApply').value;
    const email  = document.getElementById('studentEmail').value.trim();
    const phone  = document.getElementById('phone').value.trim();
    const now    = new Date();
    const btn    = document.getElementById('admitSubmitBtn');

    const webhookUrl = 'https://clientautomations.app.n8n.cloud/webhook/cdfb70f3-143a-4d0e-84bc-cdf8400d4c8f';

    btn.textContent = 'Sending...';
    btn.disabled = true;

    const payload = {
        fullName:  name,
        class:     cls,
        email:     email,
        phone:     phone || 'Not provided',
        date:      now.toLocaleDateString('en-PK'),
        time:      now.toLocaleTimeString('en-PK'),
        school:    'GHS Chak No. 237 JB'
    };

    try {
        const res = await fetch(webhookUrl, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...payload, secret: 'ghs237jb_secure_2026'})
        });

        if (res.ok || res.status === 200) {
            btn.textContent = '✅ Submitted!';
            btn.style.background = '#28a745';
            alert(`JazakAllah, ${name}!\nYour inquiry has been received.\nWe will contact you soon.\n\n— GHS Chak 237 JB`);
            e.target.reset();
            setTimeout(() => {
                btn.textContent = 'Submit Inquiry';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Server error');
        }
    } catch(err) {
        btn.textContent = 'Submit Inquiry';
        btn.disabled = false;
        alert(`JazakAllah, ${name}!\nYour inquiry has been received.\nWe will contact you soon.\n\n— GHS Chak 237 JB`);
        e.target.reset();
    }
}
window.handleAdmission = handleAdmission;

// ===== ADMIN GEAR SYSTEM =====
    let ADMIN_PASSWORD = localStorage.getItem('adminPassword') || 'AliAdmin123';

    // Load dynamic values on page load
    function loadDynamicSettings() {
        const phone = localStorage.getItem('schoolPhone') || '0302-9585836';
        const hours = localStorage.getItem('schoolHours') || 'Monday – Saturday, 8:00 AM – 2:00 PM';
        const admissionsOpen = localStorage.getItem('admissionsOpen') !== 'false';
        const chatbotVisible = localStorage.getItem('chatbotVisible') !== 'false';

        const phoneEl = document.getElementById('displayPhone');
        const hoursEl = document.getElementById('displayHours');
        const admissionSection = document.getElementById('admission');
        const chatBubble = document.getElementById('chatBubble');

        if (phoneEl) phoneEl.textContent = phone;
        if (hoursEl) hoursEl.innerHTML = hours.replace(',', '<br>');
        if (admissionSection) admissionSection.style.display = admissionsOpen ? '' : 'none';
        if (chatBubble) chatBubble.style.display = chatbotVisible ? 'flex' : 'none';

        document.querySelectorAll('a[href="#admission"]').forEach(l => {
            l.style.display = admissionsOpen ? '' : 'none';
        });
    }
    loadDynamicSettings();

    // Gear button click
    document.getElementById('adminGearBtn').addEventListener('click', () => {
        document.getElementById('adminPasswordInput').value = '';
        document.getElementById('passwordError').style.display = 'none';
        document.getElementById('passwordModal').classList.add('open');
    });

    document.getElementById('adminPasswordInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAdminPassword();
    });

    window.checkAdminPassword = function() {
        ADMIN_PASSWORD = localStorage.getItem('adminPassword') || 'AliAdmin123';
        const val = document.getElementById('adminPasswordInput').value;
        if (val === ADMIN_PASSWORD) {
            document.getElementById('passwordModal').classList.remove('open');
            // Pre-fill settings with current values
            document.getElementById('settingsPhone').value = localStorage.getItem('schoolPhone') || '0302-9585836';
            document.getElementById('settingsHours').value = localStorage.getItem('schoolHours') || 'Monday – Saturday, 8:00 AM – 2:00 PM';
            document.getElementById('admissionsToggle').checked = localStorage.getItem('admissionsOpen') !== 'false';
            document.getElementById('chatbotToggle').checked = localStorage.getItem('chatbotVisible') !== 'false';
            document.getElementById('newPassword1').value = '';
            document.getElementById('newPassword2').value = '';
            document.getElementById('settingsSaved').style.display = 'none';
            document.getElementById('passwordChangeError').style.display = 'none';
            document.getElementById('passwordChangeSuccess').style.display = 'none';
            document.getElementById('settingsModal').classList.add('open');
        } else {
            document.getElementById('passwordError').style.display = 'block';
        }
    };

    window.saveAllSettings = function() {
        // Save phone
        const phone = document.getElementById('settingsPhone').value.trim();
        if (phone) localStorage.setItem('schoolPhone', phone);

        // Save hours
        const hours = document.getElementById('settingsHours').value.trim();
        if (hours) localStorage.setItem('schoolHours', hours);

        // Save admissions toggle
        const admOpen = document.getElementById('admissionsToggle').checked;
        localStorage.setItem('admissionsOpen', admOpen);

        // Save chatbot toggle
        const chatVisible = document.getElementById('chatbotToggle').checked;
        localStorage.setItem('chatbotVisible', chatVisible);

        // Change password if filled
        const p1 = document.getElementById('newPassword1').value;
        const p2 = document.getElementById('newPassword2').value;
        const pErr = document.getElementById('passwordChangeError');
        const pOk = document.getElementById('passwordChangeSuccess');
        pErr.style.display = 'none';
        pOk.style.display = 'none';

        if (p1 || p2) {
            if (p1.length < 6) {
                pErr.textContent = 'Password must be at least 6 characters.';
                pErr.style.display = 'block';
                return;
            }
            if (p1 !== p2) {
                pErr.textContent = 'Passwords do not match!';
                pErr.style.display = 'block';
                return;
            }
            localStorage.setItem('adminPassword', p1);
            ADMIN_PASSWORD = p1;
            pOk.style.display = 'block';
        }

        // Apply changes live
        loadDynamicSettings();

        document.getElementById('settingsSaved').style.display = 'block';
        setTimeout(() => {
            document.getElementById('settingsSaved').style.display = 'none';
        }, 2500);
    };

    window.closeAdminModals = function() {
        document.getElementById('passwordModal').classList.remove('open');
        document.getElementById('settingsModal').classList.remove('open');
    };

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card .number, .ach-stat .big');
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counter.dataset.animated = 'true';
            const text = counter.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[0]);
                const suffix = text.replace(match[0], '');
                let current = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = text.replace(match[0], current);
                }, 30);
            }
        }
    });
}

// ===== CHATBOT =====
// Generate unique session ID per visit (clears on refresh = new conversation)
if (!sessionStorage.getItem('chatSessionId')) {
    sessionStorage.setItem('chatSessionId',
        'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    );
}

const chatGreeting = "السلام علیکم! 👋 Welcome to GHS Chak 237 JB. I'm here to help you. You can ask me about admissions, timings, facilities, teachers, or anything about our school!";

let chatOpen = false;
let chatWaiting = false;
const chatHistory = [];

function getTime() {
    return new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    const initial = sender === 'bot' ? '🏫' : '👤';
    div.innerHTML = `
        <div class="msg-avatar">${initial}</div>
        <div>
            <div class="msg-bubble">${text}</div>
            <div class="msg-time">${getTime()}</div>
        </div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.id = 'typingIndicator';
    div.innerHTML = `
        <div class="msg-avatar">🏫</div>
        <div class="typing-indicator"><span></span><span></span><span></span></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
}

function toggleChat(forceClose) {
    if (forceClose === true) { chatOpen = false; } else { chatOpen = !chatOpen; }
    const win = document.getElementById('chatWindow');
    win.classList.toggle('open', chatOpen);
    if (chatOpen && chatHistory.length === 0) {
        setTimeout(() => addMessage(chatGreeting, 'bot'), 400);
        chatHistory.push({ role: 'assistant', content: chatGreeting });
    }
}
window.toggleChat = toggleChat;

document.getElementById('chatBubble').addEventListener('click', function(){ toggleChat(); });

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg || chatWaiting) return;

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('quickReplies').style.display = 'none';
    addMessage(msg, 'user');
    chatHistory.push({ role: 'user', content: msg });

    const webhookUrl = 'https://clientautomations.app.n8n.cloud/webhook/8e04fdea-8ae0-4375-b409-35b8d034360e';

    chatWaiting = true;
    document.getElementById('chatSendBtn').disabled = true;
    showTyping();

    try {
        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, sessionId: sessionStorage.getItem('chatSessionId'), secret: 'ghs237jb_secure_2026' })
        });
        const data = await res.json();
        removeTyping();
        const reply = data.reply || data.message || data.output || data.text || "Thank you for your message! We'll get back to you shortly.";
        addMessage(reply, 'bot');
        chatHistory.push({ role: 'assistant', content: reply });
    } catch(err) {
        removeTyping();
        addMessage("Sorry, I'm having trouble connecting right now. Please call us at " + (localStorage.getItem('schoolPhone') || '0302-9585836'), 'bot');
    }

    chatWaiting = false;
    document.getElementById('chatSendBtn').disabled = false;
}

function sendQuick(msg) {
    document.getElementById('chatInput').value = msg;
    sendChatMessage();
}
window.sendQuick = sendQuick;
window.sendChatMessage = sendChatMessage;

function getFallbackReply(msg) {
    const m = msg.toLowerCase();
    if (m.includes('admission') || m.includes('apply') || m.includes('enroll'))
        return "📋 For admission, visit our school in person or call " + (localStorage.getItem('schoolPhone') || '0302-9585836') + ". We offer Classes 6th to 10th. Admissions are open in April–May each year.";
    if (m.includes('timing') || m.includes('time') || m.includes('hour') || m.includes('open'))
        return "🕐 School timings: " + (localStorage.getItem('schoolHours') || 'Monday–Saturday, 8:00 AM – 2:00 PM');
    if (m.includes('principal'))
        return "👨‍💼 Our Principal is Mr. Faqeer Muhammad. He leads GHS Chak 237 JB with dedication and vision.";
    if (m.includes('result') || m.includes('matric') || m.includes('2025'))
        return "🏆 Alhamdulillah! In Matric 2025, we achieved 98.12% result with 209 out of 213 students passing. We secured 1st & 3rd position in District Chiniot!";
    if (m.includes('facilit') || m.includes('lab'))
        return "🔬 We have a Science Lab, Computer Lab, Cricket Ground, Football Ground, and more!";
    if (m.includes('contact') || m.includes('phone') || m.includes('number'))
        return "📞 You can reach us at: " + (localStorage.getItem('schoolPhone') || '0302-9585836') + ". Located in Langrana, Tehsil Bhowana, District Chiniot.";
    if (m.includes('teacher') || m.includes('staff'))
        return "👨‍🏫 We have 27 dedicated teachers. Our faculty includes M.Phil and M.A. qualified teachers in all subjects.";
    return "Thank you for your question! For more details, please call us at " + (localStorage.getItem('schoolPhone') || '0302-9585836') + " or visit the school. 🏫";
}

// Enter key to send
document.getElementById('chatInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
});

// Auto resize textarea
document.getElementById('chatInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
});


}); // end DOMContentLoaded