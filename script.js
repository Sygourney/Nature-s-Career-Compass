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

// Gemini API Configuration
// IMPORTANT: Get your API key from https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyAVhmAyRLOv6Io07jPcGCMnwtqhplBXgBw'; // Replace with your API key
const GEMINI_API_URL = 'https://corsproxy.io/?https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';


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
  // Replace line breaks with <br> tags and preserve structure
  const formattedText = text
    .replace(/\n\n/g, '<br><br>')  // Double line breaks
    .replace(/\n/g, '<br>')         // Single line breaks
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold text
  
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

function generateAIResponse(message) {
  // System context for Suriname nature careers
  const systemContext = `You are an AI career guidance assistant specialized in nature and environmental careers in Suriname. You MUST answer ALL questions related to nature, environment, wildlife, conservation, education, and careers.

EDUCATION PATHWAY IN SURINAME:
1. Secondary Education (MULO/HAVO/VWO) - Foundation level
2. MBO Level: NATIN (Agriculture, Forestry, Environmental Technology), PTC (Agricultural Sciences)
3. HBO Level: IOL (Environmental Education), FHR (Applied Sciences)
4. University (WO): Anton de Kom University (Environmental Science, Biology, Forestry)
5. Specialized Training: STINASU (Nature guides), NGO programs (Conservation International, WWF)

KEY INSTITUTIONS:
- Anton de Kom University (ADEK): Environmental Science, Biology, Forestry
- NATIN: Agriculture, Forestry, Environmental Technology (MBO)
- PTC: Agricultural Sciences, Technical programs
- IOL: Environmental Education (HBO)
- STINASU: Nature guide certifications

Keep responses helpful, structured, and use emojis (🌿 🎓 🌳).`;

  const payload = {
    contents: [{
      parts: [{
        text: `${systemContext}\n\nUser question: ${message}`
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  };

  fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    removeTypingIndicator();
    
    let aiResponse = '';
    
    // Extract response from Gemini API structure
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0]) {
      aiResponse = data.candidates[0].content.parts[0].text;
    }
    
    // Use fallback if no response
    if (!aiResponse) {
      aiResponse = getFallbackResponse(message);
    }
    
    addChatMessage(aiResponse, 'bot');
  })
  .catch(error => {
    console.error('Gemini API Error:', error);
    removeTypingIndicator();
    
    // Use fallback response
    const fallbackResponse = getFallbackResponse(message);
    addChatMessage(fallbackResponse, 'bot');
  });
}

function getFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  // School/Education pathway queries - MORE DETAILED
  if (msg.includes('school') || msg.includes('university') || msg.includes('education') || msg.includes('study') || msg.includes('learn') || msg.includes('opleiding')) {
    return `🎓 **Educational Pathway for Nature Careers in Suriname:**

**STEP 1: Secondary Education (Foundation)**
• Complete MULO, HAVO, or VWO (ages 12-18)
• Focus on Biology, Chemistry, Geography

**STEP 2: Vocational Training (MBO Level)**

🌳 **NATIN (Nationaal Instituut voor Technologie)**
• Agriculture programs
• Forestry technology
• Environmental technology
• Duration: 2-4 years

🌱 **PTC (Polytechnic College)**
• Agricultural Sciences
• Technical environmental programs
• Duration: 2-4 years

**STEP 3: Higher Professional Education (HBO Level)**

📚 **IOL (Institute for Teacher Training)**
• Environmental Education specialization
• Duration: 4 years

📚 **FHR at Anton de Kom University**
• Applied environmental sciences
• Duration: 4 years

**STEP 4: University Education (WO Level)**

🎓 **Anton de Kom University (ADEK)**
• Bachelor's: Environmental Science, Biology, Forestry (4 years)
• Master's: Advanced environmental studies (2 years)

**STEP 5: Specialized Training**
• STINASU - Nature guide certifications
• NGO programs (Conservation International, WWF)
• Professional workshops and field training

💡 **Recommended Path Example:**
MULO/HAVO → NATIN (Forestry) → Work experience → Anton de Kom University (Environmental Science) → Specialized NGO training

What specific career interests you? I can give you the exact pathway!`;
  }
  
  // Wildlife/Animal careers - MORE COMPLETE
  if (msg.includes('wildlife') || msg.includes('animal') || msg.includes('rehabilit') || msg.includes('dier')) {
    return `🐾 **Becoming a Wildlife Rehabilitator in Suriname:**

**EDUCATIONAL PATH:**

1️⃣ **Start:** HAVO/VWO with Biology focus

2️⃣ **MBO Level:** NATIN or PTC - Animal Care/Agriculture (2-4 years)

3️⃣ **HBO/University:** Anton de Kom - Biology or Veterinary-related studies (4 years)

4️⃣ **Specialization:** Wildlife handling workshops & internships

📚 **Key Skills to Develop:**
• Animal behavior and handling
• First aid for wildlife
• Local species knowledge (Suriname's fauna)
• Patience and compassion
• Record keeping and documentation

🏢 **Where to Work in Suriname:**
• Green Heritage Fund Suriname
• Suriname Forest Service (SBB)
• Private wildlife rescue centers
• Nature reserves (Brownsberg, Raleighvallen)
• Veterinary clinics with wildlife focus

🌟 **Getting Started NOW:**
• Volunteer at local animal shelters
• Join Green Heritage Fund programs
• Take online wildlife courses
• Build experience with domestic animals first

💰 **Career Prospects:**
Entry level: SRD 2,500-4,000/month
Experienced: SRD 5,000-8,000/month
Can also work independently or start your own wildlife center!

Want more info about internship opportunities?`;
  }
  
  // Conservation/Forest careers - EXPANDED
  if (msg.includes('forest') || msg.includes('conservation') || msg.includes('protect') || msg.includes('bos') || msg.includes('natuur')) {
    return `🌳 **Forest Conservation Careers in Suriname:**

**EDUCATIONAL PATHWAY:**

1️⃣ **Foundation:** MULO/HAVO - Focus on Biology, Geography

2️⃣ **Vocational:** NATIN Forestry Program (2-4 years) ✅ RECOMMENDED START

3️⃣ **Higher Education:** Anton de Kom University - Environmental Science/Forestry (4 years Bachelor + optional 2 years Master)

4️⃣ **Field Experience:** Internships with SBB, Conservation International (6-12 months)

📚 **Essential Skills:**
• Biodiversity monitoring & identification
• GIS mapping and GPS usage
• Community engagement
• Report writing
• Physical fitness for fieldwork
• Dutch, English, and ideally Sranantongo

🏢 **Top Employers in Suriname:**
• **Suriname Forest Service (SBB)** - Main government forestry agency
• **Conservation International Suriname** - International NGO
• **Amazon Conservation Team (ACT)** - Community-based conservation
• **WWF Guianas** - Wildlife and habitat protection
• **Nature reserves**: Brownsberg, Central Suriname Nature Reserve, Raleighvallen

💼 **Job Responsibilities:**
• Monitor forest health and wildlife populations
• Prevent illegal logging and poaching
• Work with indigenous and local communities
• Conduct research and collect data
• Implement conservation projects

💰 **Salary Range:**
Entry: SRD 3,000-5,000/month
Mid-level: SRD 6,000-10,000/month
Senior: SRD 12,000+/month

🌟 **Extra Certifications:**
• Chainsaw safety course
• First aid in remote areas
• Wildlife tracking certification
• Community facilitation training

Ready to start? Apply to NATIN's forestry program!`;
  }
  
  // Eco-tourism - DETAILED
  if (msg.includes('tourism') || msg.includes('tour') || msg.includes('guide') || msg.includes('eco-tour') || msg.includes('gids')) {
    return `🗺️ **Eco-Tourism Career Path in Suriname:**

**EDUCATION ROUTE:**
1️⃣ **Entry Level:** MULO/HAVO - Focus on languages & geography
2️⃣ **Professional Training:**
   • NATIN - Tourism & Hospitality program (2 years)
   • PTC - Tourism Management (2-3 years)
3️⃣ **Certification:** STINASU Nature Guide Course ⭐ ESSENTIAL (3-6 months)
4️⃣ **Optional Higher Ed:** Anton de Kom - Environmental Science + Tourism minor

🎓 **STINASU Nature Guide Training Includes:**
• Suriname's ecosystems and biodiversity
• Bird identification (500+ species!)
• Safety and emergency procedures
• Tour planning and logistics
• Customer service excellence
• Cultural heritage knowledge

💼 **Career Options:**
• Independent Nature Guide
• Lodge Manager (Brownsberg, Anaula, etc.)
• River Tour Operator
• Wildlife Tour Specialist
• Cultural Heritage Guide
• Eco-lodge Developer

🏢 **Where to Work:**
• STINASU (Foundation for Nature Conservation)
• Private eco-lodges (Danpaati, Awaradam)
• Tour operators (Wilderness Explorers, Orange Travel)
• Butterfly Garden, Neotropical Butterfly Park
• Start your own tour company!

💰 **Income Potential:**
Tour Guide: SRD 150-300 per tour + tips
Monthly (active season): SRD 4,000-8,000
Lodge Manager: SRD 6,000-12,000/month
Own business: SRD 10,000-25,000+/month

🌟 **Languages are KEY:**
• Dutch (required)
• English (required)
• Portuguese/Spanish (very valuable)
• Sranantongo, Sarnami (helpful)

📍 **Popular Tour Locations:**
• Central Suriname Nature Reserve (UNESCO)
• Galibi (sea turtles)
• Brownsberg Nature Park
• Upper Suriname River
• Kabalebo Nature Resort

Start with STINASU certification - it's the golden ticket!`;
  }
  
  // NATIN specific queries
  if (msg.includes('natin')) {
    return `🏫 **NATIN (Nationaal Instituut voor Technologie):**

NATIN is an excellent MBO-level vocational school in Suriname offering nature-related programs!

🌱 **Nature-Related Programs at NATIN:**
1. **Agriculture (Landbouw)**
   • Sustainable farming practices
   • Crop management
   • Soil science
   • Duration: 2-4 years (depending on level)

2. **Forestry (Bosbouw)**
   • Forest management
   • Tree identification
   • Conservation techniques
   • Field work training
   • Duration: 3-4 years

3. **Environmental Technology**
   • Water management
   • Waste management
   • Environmental monitoring
   • Sustainability practices
   • Duration: 3-4 years

📍 **Location:** Paramaribo, Suriname

🎓 **Entry Requirements:**
• Completed MULO or equivalent
• Good grades in Biology and Mathematics
• Motivation letter for some programs

💡 **After NATIN, you can:**
• Work directly in the field (entry-level positions)
• Continue to HBO level (IOL, FHR)
• Pursue Bachelor's at Anton de Kom University
• Get specialized certifications

🌟 **Advantages of NATIN:**
✅ Practical, hands-on training
✅ Strong industry connections
✅ More affordable than university
✅ Shorter duration (2-4 years)
✅ Good foundation for further study

Want to know which NATIN program matches your career goal?`;
  }
  
  // Specific career path questions
  if (msg.includes('how') || msg.includes('become') || msg.includes('hoe') || msg.includes('worden')) {
    return `🎯 **Creating Your Nature Career Path:**

Tell me which career interests you most, and I'll give you the EXACT steps:

🌿 **Available Career Paths:**
1. Forest Conservation Officer
2. Wildlife Rehabilitator  
3. Environmental Educator
4. Eco-Tourism Guide
5. Sustainable Farmer
6. Park Ranger
7. Marine Conservationist
8. Climate Campaigner
9. Environmental Journalist
10. Green Business Developer

📋 **General Pathway Formula:**
**Stage 1:** Secondary school (MULO/HAVO/VWO) ✓
**Stage 2:** Vocational training (NATIN/PTC) - 2-4 years ✓
**Stage 3:** Higher education (IOL/University) - 4 years ✓ (Optional but recommended)
**Stage 4:** Specialized training & certifications ✓
**Stage 5:** Internships & volunteer work ✓
**Stage 6:** Entry-level job ✓
**Stage 7:** Career growth & specialization ✓

💬 Type the career name (like "wildlife rehabilitator" or "tour guide") and I'll show you the complete step-by-step pathway with schools, costs, and timeline!`;
  }

  // Jobs/salary/work queries
  if (msg.includes('job') || msg.includes('work') || msg.includes('salary') || msg.includes('salaris') || msg.includes('verdien')) {
    return `💼 **Nature Career Jobs & Salaries in Suriname:**

**ENTRY LEVEL POSITIONS:**
🌱 Junior Ranger/Field Assistant: SRD 2,500-4,000/month
🌱 Environmental Educator Assistant: SRD 2,800-4,500/month
🌱 Tour Guide (starting): SRD 3,000-5,000/month
🌱 Agriculture Technician: SRD 2,500-4,000/month

**MID-LEVEL POSITIONS:**
🌳 Forest Conservation Officer: SRD 5,000-8,000/month
🌳 Wildlife Rehabilitator: SRD 4,500-7,500/month
🌳 Environmental Educator: SRD 5,500-9,000/month
🌳 Eco-Tourism Manager: SRD 6,000-10,000/month
🌳 Sustainability Coordinator: SRD 6,500-9,500/month

**SENIOR/SPECIALIST:**
🌟 Conservation Project Manager: SRD 10,000-15,000/month
🌟 Environmental Consultant: SRD 12,000-20,000/month
🌟 Park Director: SRD 13,000-18,000/month
🌟 Senior Researcher: SRD 11,000-16,000/month

**TOP EMPLOYERS IN SURINAME:**
🏢 Government: SBB (Forest Service), NIMOS (Environmental Institute)
🏢 NGOs: Conservation International, WWF, ACT, Green Heritage Fund
🏢 Private: Eco-lodges, tour companies, consulting firms
🏢 Education: Anton de Kom University, NATIN, IOL
🏢 International: UN agencies, development organizations

💡 **Tips to Increase Your Value:**
✅ Learn multiple languages (English, Portuguese, Spanish)
✅ Get certified (STINASU guide, GIS specialist, etc.)
✅ Build field experience through volunteering
✅ Network with professionals
✅ Consider a Master's degree for senior positions

Which specific career interests you? I can give detailed job descriptions!`;
  }

  // Volunteer/internship queries
  if (msg.includes('volunteer') || msg.includes('intern') || msg.includes('vrijwillig') || msg.includes('stage')) {
    return `🤝 **Volunteer & Internship Opportunities in Suriname:**

**GREAT PLACES TO START:**

🌿 **Green Heritage Fund Suriname**
• Wildlife rescue and rehabilitation
• Duration: Flexible (1-6 months)
• Activities: Animal care, feeding, enrichment
• Contact: Through their Facebook page or website

🌳 **Conservation International Suriname**
• Forest monitoring and research
• Duration: 3-6 months
• Requirements: Students in environmental studies
• Benefits: Experience + reference letter

🐢 **Galibi Sea Turtle Conservation**
• Sea turtle protection and monitoring
• Duration: Seasonal (March-August)
• Activities: Night patrols, data collection, education
• Great for students and gap year

🦋 **Neotropical Butterfly Park**
• Butterfly conservation and visitor education
• Duration: Flexible
• Activities: Garden maintenance, tours, education

🏞️ **STINASU Nature Reserves**
• Park maintenance and visitor support
• Locations: Brownsberg, Raleighvallen, others
• Duration: 1-3 months
• May include accommodation

**BENEFITS OF VOLUNTEERING:**
✅ Real-world experience
✅ Network with professionals
✅ Build your CV/resume
✅ Learn practical skills
✅ Explore potential career paths
✅ Get reference letters
✅ May lead to paid positions!

**UNIVERSITY INTERNSHIP PROGRAMS:**
If you're studying at Anton de Kom University or abroad, you can arrange official internships with:
• Suriname Forest Service (SBB)
• NIMOS (Environmental Institute)
• WWF Guianas
• Amazon Conservation Team

📧 **How to Apply:**
1. Prepare a motivation letter
2. Update your CV
3. Email or visit the organization
4. Be ready to commit time and energy
5. Show genuine passion for nature!

Want contact details for a specific organization?`;
  }
  
  // General/catch-all response - MORE ENCOURAGING
  return `🌿 **Welcome! I'm here to help with Nature Careers in Suriname!**

I can help you with:

🎓 **Education & Schools:**
• Educational pathways (MULO → NATIN/PTC → University)
• School information (NATIN, Anton de Kom, IOL, PTC)
• Program recommendations based on your interests

💼 **Career Information:**
• Job descriptions and responsibilities
• Salary expectations
• Where to work in Suriname
• Skills needed for each career

📚 **Getting Started:**
• Step-by-step guides for specific careers
• Volunteer and internship opportunities
• Certification programs
• Study tips and requirements

🌍 **Specific Nature Fields:**
• Wildlife & Animal Care
• Forest Conservation
• Eco-Tourism
• Environmental Education
• Sustainable Agriculture
• Marine Conservation
• Climate Action

💬 **Just ask me questions like:**
"How do I become a wildlife rehabilitator?"
"What can I study at NATIN?"
"Where can I work as a tour guide?"
"What's the salary for a forest ranger?"
"How do I volunteer with animals?"

I'm ready to help you find your perfect nature career! What would you like to know? 🌱`;
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', init);


