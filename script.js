// Quiz data and variables
const questions = [
  {
    category: "Passion",
    text: "What's your biggest passion?",
    options: [
      "Protect Suriname's rainforest",
      "Care for wildlife",
      "Inspire nature guardians",
      "Promote eco-tourism",
      "Empower local defenders",
      "Farm with respect",
      "Fight for eco-justice",
      "Restore coastal ecosystems",
      "Create green solutions",
      "Tell nature's stories"
    ]
  },
  {
    category: "Primary Environmental Skills",
    text: "Which primary environmental skill feels most natural to you?",
    options: [
      "Biodiversity Monitoring",
      "Wildlife Handling & Care",
      "Environmental Education",
      "Sustainable Agriculture",
      "Ecosystem Restoration",
      "Climate Policy Knowledge",
      "GIS & Mapping",
      "Eco-Tourism Planning"
    ]
  },
  {
    category: "Secondary Environmental Skills",
    text: "Which secondary environmental skill describes you best?",
    options: [
      "Community Engagement",
      "Storytelling for Change",
      "Public Speaking",
      "Project Management",
      "Social Media Outreach",
      "Cross-Cultural Communication",
      "Team Collaboration",
      "Creative Problem Solving"
    ]
  },
  {
    category: "Working Style",
    text: "Which working style suits you best?",
    options: [
      "Collaborative",
      "Hands-On / Field-Oriented",
      "Mission-Driven",
      "Educational & Inspirational",
      "Creative Thinker",
      "Detail-Oriented",
      "Adaptable & Resilient",
      "Ethical & Responsible"
    ]
  },
  {
    category: "Motivation",
    text: "What motivates you most in your work?",
    options: [
      "Making a tangible impact on nature",
      "Helping and educating others",
      "Innovating sustainable solutions",
      "Advocating for environmental justice",
      "Connecting people to nature"
    ]
  }
];

// Enhanced career matches with detailed reasoning
const careerMatches = [
  {
    title: "Forest Conservation Officer",
    keywords: ["Protect Suriname's rainforest", "Biodiversity Monitoring", "Collaborative", "Mission-Driven"],
    description: "You work to protect and monitor forest ecosystems, ensuring sustainability and preventing illegal activities.",
    reasoning: [
      "Your passion for protecting rainforests aligns perfectly with forest conservation work",
      "Biodiversity monitoring skills are essential for tracking forest health and wildlife populations",
      "Your collaborative approach helps coordinate with local communities and organizations",
      "Mission-driven personality ensures dedication to long-term conservation goals"
    ]
  },
  {
    title: "Wildlife Rehabilitator",
    keywords: ["Care for wildlife", "Wildlife Handling & Care", "Hands-On / Field-Oriented", "Ethical & Responsible"],
    description: "You help care for injured and orphaned wildlife, nursing them back to health and releasing them back into their natural habitats.",
    reasoning: [
      "Your deep care for wildlife drives your dedication to animal rehabilitation",
      "Wildlife handling skills are crucial for safe and effective animal care",
      "Hands-on approach suits the practical nature of wildlife rehabilitation work",
      "Ethical responsibility ensures proper animal welfare standards are maintained"
    ]
  },
  {
    title: "Environmental Education Coordinator",
    keywords: ["Inspire nature guardians", "Environmental Education", "Educational & Inspirational", "Public Speaking"],
    description: "You educate communities and youth about nature conservation and environmental stewardship through programs and outreach.",
    reasoning: [
      "Your passion for inspiring others makes you an effective environmental educator",
      "Environmental education background provides necessary knowledge base",
      "Inspirational communication style engages audiences and motivates action",
      "Public speaking skills help deliver impactful presentations and workshops"
    ]
  },
  {
    title: "Eco-Tourism Guide/Manager",
    keywords: ["Promote eco-tourism", "Eco-Tourism Planning", "Creative Thinker", "Community Engagement"],
    description: "You lead tours and manage eco-friendly tourism projects that help preserve nature while educating visitors.",
    reasoning: [
      "Your interest in eco-tourism supports sustainable travel practices",
      "Tourism planning skills help create meaningful and educational experiences",
      "Creative thinking develops unique and engaging tour programs",
      "Community engagement ensures local participation and economic benefits"
    ]
  },
  {
    title: "Organic Farmer/Sustainable Agriculture Trainer",
    keywords: ["Farm with respect", "Sustainable Agriculture", "Hands-On / Field-Oriented", "Detail-Oriented"],
    description: "You cultivate crops using sustainable practices, respecting the land and promoting ecological balance.",
    reasoning: [
      "Your respect for farming practices aligns with sustainable agriculture principles",
      "Agricultural knowledge enables effective crop management and soil health",
      "Hands-on approach suits the practical nature of farming work",
      "Attention to detail ensures successful crop production and ecosystem balance"
    ]
  },
  {
    title: "Climate Justice Campaigner",
    keywords: ["Fight for eco-justice", "Climate Policy Knowledge", "Mission-Driven", "Public Speaking"],
    description: "You advocate for policies and actions that fight climate change and promote environmental justice.",
    reasoning: [
      "Your passion for eco-justice drives effective advocacy efforts",
      "Climate policy knowledge provides foundation for effective campaigning",
      "Mission-driven approach sustains long-term advocacy and activism work",
      "Public speaking skills help communicate important environmental messages"
    ]
  },
  {
    title: "Mangrove Restoration Specialist",
    keywords: ["Restore coastal ecosystems", "Ecosystem Restoration", "Hands-On / Field-Oriented", "Adaptable & Resilient"],
    description: "You work on restoring coastal ecosystems like mangroves, protecting habitats and communities from climate impacts.",
    reasoning: [
      "Your focus on coastal restoration addresses critical environmental needs",
      "Ecosystem restoration expertise enables effective habitat recovery work",
      "Field-oriented approach suits hands-on restoration and monitoring work",
      "Adaptability helps navigate changing coastal conditions and challenges"
    ]
  },
  {
    title: "Green Business Developer",
    keywords: ["Create green solutions", "Creative Thinker", "Project Management", "Cross-Cultural Communication"],
    description: "You develop innovative eco-friendly business ideas that promote sustainability and economic growth.",
    reasoning: [
      "Your drive to create solutions leads to innovative sustainable business ideas",
      "Creative thinking generates unique approaches to environmental challenges",
      "Project management skills ensure successful business development and implementation",
      "Communication skills help build partnerships and market sustainable solutions"
    ]
  },
  {
    title: "Environmental Journalist/Storyteller",
    keywords: ["Tell nature's stories", "Storytelling for Change", "Social Media Outreach", "Creative Thinker"],
    description: "You tell impactful stories about the environment to raise awareness and inspire action.",
    reasoning: [
      "Your passion for storytelling amplifies important environmental messages",
      "Storytelling skills create compelling narratives that drive change",
      "Social media expertise reaches broader audiences with environmental content",
      "Creative approach makes complex environmental issues more engaging and accessible"
    ]
  }
];

let currentQuestionIndex = 0;
const userAnswers = [];

// Backend URL - Change this when you deploy to production
const BACKEND_URL = 'https://nature-career-backend.onrender.com/api/chat';

// DOM elements
const introSection = document.getElementById('intro');
const quizSection = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result');
const careerResult = document.getElementById('career-result');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

// Chatbot elements
const chatbotFab = document.getElementById('chatbot-fab');

// Event listeners
if (startBtn) startBtn.addEventListener('click', startQuiz);
if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Chatbot event listeners
if (chatbotFab) chatbotFab.addEventListener('click', openChatbot);

// Mobile menu toggle
function toggleMobileMenu() {
  if (mainNav) mainNav.classList.toggle('active');
}

// Initialize the page
function init() {
  if (introSection) introSection.classList.remove('hidden');
  if (quizSection) quizSection.classList.add('hidden');
  if (resultSection) resultSection.classList.add('hidden');
  if (nextBtn) nextBtn.classList.add('hidden');
}

// Start the quiz
function startQuiz() {
  if (introSection) introSection.classList.add('hidden');
  if (resultSection) resultSection.classList.add('hidden');
  if (quizSection) quizSection.classList.remove('hidden');
  
  currentQuestionIndex = 0;
  userAnswers.length = 0;
  showQuestion();
  
  if (nextBtn) nextBtn.classList.add('hidden');
}

// Show current question
function showQuestion() {
  if (nextBtn) nextBtn.classList.add('hidden');

  if (currentQuestionIndex >= questions.length) {
    setTimeout(showResult, 400);
    return;
  }

  if (questionContainer) questionContainer.innerHTML = '';
  const q = questions[currentQuestionIndex];

  const questionBox = document.createElement('div');
  questionBox.classList.add('question-box');
  setTimeout(() => questionBox.classList.add('show'), 50);

  const questionText = document.createElement('h2');
  questionText.textContent = q.text;
  questionBox.appendChild(questionText);

  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');

  q.options.forEach(optionText => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.textContent = optionText;

    btn.addEventListener('click', () => {
      clearSelected(optionsDiv);
      btn.classList.add('selected');
      userAnswers[currentQuestionIndex] = optionText;
      if (nextBtn) nextBtn.classList.remove('hidden');
    });

    optionsDiv.appendChild(btn);
  });

  questionBox.appendChild(optionsDiv);
  if (questionContainer) questionContainer.appendChild(questionBox);
}

// Clear selected options
function clearSelected(container) {
  const buttons = container.querySelectorAll('button.option');
  buttons.forEach(btn => btn.classList.remove('selected'));
}

// Move to next question
function nextQuestion() {
  if (!userAnswers[currentQuestionIndex]) {
    alert("Please select an option before continuing.");
    return;
  }

  const questionBox = document.querySelector('.question-box');
  if (questionBox) {
    questionBox.classList.remove('show');
    questionBox.classList.add('hide');
  }

  if (nextBtn) nextBtn.classList.add('hidden');

  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500);
}

// Show result with enhanced display
function showResult() {
  if (quizSection) quizSection.classList.add('hidden');
  if (resultSection) resultSection.classList.remove('hidden');

  const bestCareer = findBestCareerMatch();
  displayEnhancedResult(bestCareer);
}

// Find best career match
function findBestCareerMatch() {
  const scores = careerMatches.map(career => {
    let score = 0;
    career.keywords.forEach(keyword => {
      if (userAnswers.includes(keyword)) score++;
    });
    return score;
  });

  const maxScore = Math.max(...scores);
  let bestIndex = scores.indexOf(maxScore);
  if (maxScore === 0) bestIndex = 0;

  return careerMatches[bestIndex];
}

// Display enhanced result with reasoning
function displayEnhancedResult(career) {
  const matches = career.keywords.filter(keyword => userAnswers.includes(keyword));
  
  if (careerResult) {
    careerResult.innerHTML = `
      <div class="result-box">
        <h3>${career.title}</h3>
        <p>${career.description}</p>
        
        <div class="reasoning-section">
          <h4><i class="fas fa-lightbulb"></i> Why This Career Matches You:</h4>
          ${career.reasoning.map((reason, index) => 
            `<div class="match-item">
              <strong>Match ${index + 1}:</strong> ${reason}
            </div>`
          ).join('')}
          
          <div style="margin-top: 20px; padding: 15px; background: rgba(76, 175, 80, 0.1); border-radius: 10px; border-left: 4px solid var(--light-green);">
            <strong style="color: var(--accent);">Your Key Matches:</strong><br>
            ${matches.map(match => `• ${match}`).join('<br>')}
          </div>
        </div>
        
        <p style="margin-top: 20px; font-style: italic; color: var(--light-green);">
          <i class="fas fa-heart"></i> Nature's Career Compass is excited to guide you on this meaningful journey!
        </p>
      </div>
    `;
  }
}

// Reset quiz
function resetQuiz() {
  location.reload();
}

// ============ CHATBOT FUNCTIONS ============

function openChatbot() {
  // Check if overlay already exists
  if (document.getElementById('chatbot-overlay')) return;
  
  // Create fullscreen overlay
  const overlay = document.createElement('div');
  overlay.id = 'chatbot-overlay';
  overlay.innerHTML = `
    <div class="fullscreen-chatbot">
      <div class="fullscreen-chatbot-header">
        <h3><i class="fas fa-brain"></i> AI Career Assistant</h3>
        <button class="close-chatbot">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="fullscreen-chatbot-messages" id="fullscreen-chatbot-messages">
        <div class="message bot">
          Hello! I'm your AI Career Guide specialized in nature and environmental careers in Suriname. I can help you with:
          <br><br>
          • Information about nature careers and required education
          • Schools and universities in Suriname for environmental studies
          • Career paths in conservation, wildlife, eco-tourism, and more
          • General questions about environmental work
          <br><br>
          What would you like to know?
        </div>
      </div>
      <div class="fullscreen-chatbot-input">
        <input type="text" id="fullscreen-chatbot-input" placeholder="Ask me about nature careers, schools, education...">
        <button id="fullscreen-send-btn"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  document.querySelector('.close-chatbot').addEventListener('click', closeChatbot);
  document.getElementById('fullscreen-send-btn').addEventListener('click', sendChatMessage);
  document.getElementById('fullscreen-chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
  
  // Focus input
  document.getElementById('fullscreen-chatbot-input').focus();
  
  // Hide FAB
  if (chatbotFab) chatbotFab.classList.add('hidden');
}

function closeChatbot() {
  const overlay = document.getElementById('chatbot-overlay');
  if (overlay) overlay.remove();
  
  // Show FAB again
  if (chatbotFab) chatbotFab.classList.remove('hidden');
}

function sendChatMessage() {
  const input = document.getElementById('fullscreen-chatbot-input');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  // Add user message
  addChatMessage(message, 'user');
  input.value = '';
  
  // Show typing indicator
  addTypingIndicator();
  
  // Generate AI response
  generateAIResponse(message);
}

function addChatMessage(text, sender) {
  const messagesContainer = document.getElementById('fullscreen-chatbot-messages');
  if (!messagesContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  
  // Convert text to HTML with proper formatting
  const formattedText = text
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  messageDiv.innerHTML = formattedText;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
  const messagesContainer = document.getElementById('fullscreen-chatbot-messages');
  if (!messagesContainer) return;
  
  // Remove existing indicator if present
  const existing = document.getElementById('typing-indicator');
  if (existing) existing.remove();
  
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'typing');
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="typing-animation">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span class="typing-text">AI is thinking...</span>
  `;
  
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

// Calls backend instead of Gemini directly
function generateAIResponse(message) {
  // Call YOUR backend server (which has the API key)
  fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Backend error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    removeTypingIndicator();
    
    // Get the AI response from your backend
    const aiResponse = data.response || getFallbackResponse(message);
    
    addChatMessage(aiResponse, 'bot');
  })
  .catch(error => {
    console.error('Backend Error:', error);
    removeTypingIndicator();
    
    // Use fallback response if backend fails
    const fallbackResponse = getFallbackResponse(message);
    addChatMessage(fallbackResponse, 'bot');
  });
}

function getFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  // School/Education pathway queries
  if (msg.includes('school') || msg.includes('university') || msg.includes('education') || msg.includes('study') || msg.includes('learn')) {
    return `🎓 **Educational Pathway for Nature Careers in Suriname:**

**🌱 STEP 1: Secondary Education**
• Complete MULO, HAVO, or VWO
• Focus on Biology, Chemistry, Geography

**🌳 STEP 2: Vocational Training (MBO)**
🌳 NATIN - Agriculture, Forestry, Environmental Technology (2-4 years)
🌾 PTC - Agricultural Sciences, Technical programs (2-4 years)

**🌿 STEP 3: Higher Education (HBO)**
📚 IOL - Environmental Education specialization (4 years)
📚 FHR - Applied environmental sciences (4 years)

**🎓 STEP 4: University (WO)**
🏛️ Anton de Kom University - Environmental Science, Biology, Forestry (4-6 years)

**⭐ STEP 5: Specialized Training**
• STINASU - Nature guide certifications
• NGO programs (Conservation International, WWF)

What specific career interests you?`;
  }
  
  // Wildlife/Animal careers
  if (msg.includes('wildlife') || msg.includes('animal') || msg.includes('rehabilit')) {
    return `🐾 **Becoming a Wildlife Rehabilitator in Suriname:**

**🛤️ Path:** HAVO/VWO → NATIN (Animal Care) → Anton de Kom (Biology) → Wildlife workshops

**💪 Key Skills:** Animal handling, first aid, local species knowledge, patience

**🏢 Where to Work:**
• Green Heritage Fund Suriname
• Suriname Forest Service (SBB)
• Private wildlife rescue centers
• Nature reserves

**💰 Salary:** SRD 2,500-8,000/month (depending on experience)

Want more details about internships?`;
  }
  
  // General response
  return `🌿 **I'm here to help with Nature Careers in Suriname!**

I can help you with:
🎓 Education pathways and schools
💼 Career information and salaries
🌳 Specific nature fields (wildlife, conservation, tourism, etc.)
🌱 Getting started advice

Just ask me questions like:
"How do I become a wildlife rehabilitator?"
"What can I study at NATIN?"
"Where can I work as a tour guide?"

What would you like to know? 🌱`;
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', init);