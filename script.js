// Reset page 10 seconds after showing the final job answer
function setupAutoResetAfterResult() {
  const resultSection = document.getElementById('result');
  const observer = new MutationObserver(() => {
    if (!resultSection.classList.contains('hidden')) {
      setTimeout(() => {
        window.location.reload();
      }, 15000);
    }
  });
  observer.observe(resultSection, { attributes: true, attributeFilter: ['class'] });
}

window.addEventListener('DOMContentLoaded', setupAutoResetAfterResult);
const openAIKey = "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";

const questions = [
  {
    category: "Passion",
    text: "What’s your biggest passion?",
    options: [
      "Protect Suriname’s rainforest",
      "Care for wildlife",
      "Inspire nature guardians",
      "Promote eco-tourism",
      "Empower local defenders",
      "Farm with respect",
      "Fight for eco-justice",
      "Restore coastal ecosystems",
      "Create green solutions",
      "Tell nature’s stories"
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

// Career descriptions for fallback & display if no AI available
const careerMatches = [
  {
    title: "Forest Conservation Officer",
    keywords: [
      "Protect Suriname’s rainforest",
      "Biodiversity Monitoring",
      "Collaborative",
      "Mission-Driven"
    ],
    description: "You work to protect and monitor forest ecosystems, ensuring sustainability and preventing illegal activities."
  },
  {
    title: "Wildlife Rehabilitator / Animal Conservationist",
    keywords: [
      "Care for wildlife",
      "Wildlife Handling & Care",
      "Hands-On / Field-Oriented",
      "Ethical & Responsible"
    ],
    description: "You help care for injured and orphaned wildlife, nursing them back to health and releasing them back into their natural habitats."
  },
  {
    title: "Environmental Education Coordinator",
    keywords: [
      "Inspire nature guardians",
      "Environmental Education",
      "Educational & Inspirational",
      "Public Speaking"
    ],
    description: "You educate communities and youth about nature conservation and environmental stewardship through programs and outreach."
  },
  {
    title: "Eco-Tourism Guide / Manager",
    keywords: [
      "Promote eco-tourism",
      "Eco-Tourism Planning",
      "Creative Thinker",
      "Community Engagement"
    ],
    description: "You lead tours and manage eco-friendly tourism projects that help preserve nature while educating visitors."
  },
  {
    title: "Organic Farmer / Sustainable Agriculture Trainer",
    keywords: [
      "Farm with respect",
      "Sustainable Agriculture",
      "Hands-On / Field-Oriented",
      "Detail-Oriented"
    ],
    description: "You cultivate crops using sustainable practices, respecting the land and promoting ecological balance."
  },
  {
    title: "Climate Justice Campaigner",
    keywords: [
      "Fight for eco-justice",
      "Climate Policy Knowledge",
      "Mission-Driven",
      "Public Speaking"
    ],
    description: "You advocate for policies and actions that fight climate change and promote environmental justice."
  },
  {
    title: "Mangrove Restoration Specialist",
    keywords: [
      "Restore coastal ecosystems",
      "Ecosystem Restoration",
      "Hands-On / Field-Oriented",
      "Adaptable & Resilient"
    ],
    description: "You work on restoring coastal ecosystems like mangroves, protecting habitats and communities from climate impacts."
  },
  {
    title: "Green Business Developer",
    keywords: [
      "Create green solutions",
      "Creative Thinker",
      "Project Management",
      "Cross-Cultural Communication"
    ],
    description: "You develop innovative eco-friendly business ideas that promote sustainability and economic growth."
  },
  {
    title: "Environmental Journalist / Storyteller",
    keywords: [
      "Tell nature’s stories",
      "Storytelling for Change",
      "Social Media Outreach",
      "Creative Thinker"
    ],
    description: "You tell impactful stories about the environment to raise awareness and inspire action."
  }
];

let currentQuestionIndex = 0;
const userAnswers = [];

const introSection = document.getElementById('intro');
const quizSection = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result');
const careerResult = document.getElementById('career-result');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// Toon meteen intro bij laden
introSection.classList.remove('hidden');

function startQuiz() {
  introSection.classList.add('hidden');
  resultSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  currentQuestionIndex = 0;
  userAnswers.length = 0;
  showQuestion();
  nextBtn.classList.add('hidden');
}

function showQuestion() {
  nextBtn.classList.add('hidden');

  if (currentQuestionIndex >= questions.length) {
    setTimeout(showResult, 400);
    return;
  }

  questionContainer.innerHTML = '';
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
      nextBtn.classList.remove('hidden');
    });

    optionsDiv.appendChild(btn);
  });

  questionBox.appendChild(optionsDiv);
  questionContainer.appendChild(questionBox);
}

function clearSelected(container) {
  const buttons = container.querySelectorAll('button.option');
  buttons.forEach(btn => btn.classList.remove('selected'));
}

function nextQuestion() {
  if (!userAnswers[currentQuestionIndex]) {
    alert("Please select an option before continuing.");
    return;
  }

  const questionBox = document.querySelector('.question-box');
  questionBox.classList.remove('show');
  questionBox.classList.add('hide');

  nextBtn.classList.add('hidden');

  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 500);
}

async function showResult() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');

  // Combine answers to prompt AI
  const prompt = generatePrompt(userAnswers);

  if (!openAIKey) {
    displayFallbackResult();
    return;
  }

  try {
    careerResult.innerHTML = `<p>Loading AI career match...</p>`;
    const aiResponse = await getCareerFromAI(prompt, openAIKey);
    careerResult.innerHTML = createResultHTML(aiResponse);
    addResultAnimation();
  } catch (error) {
    console.error('OpenAI API error:', error);
    careerResult.innerHTML = `<p>Sorry, AI service is currently unavailable. Showing default result.</p>`;
    displayFallbackResult();
  }
}

function generatePrompt(answers) {
  return `
You are a helpful career advisor specialized in environmental and nature jobs in Suriname.
Based on these user answers:
- Passion: ${answers[0]}
- Primary Skill: ${answers[1]}
- Secondary Skill: ${answers[2]}
- Working Style: ${answers[3]}
- Motivation: ${answers[4]}

Please suggest the most suitable nature-related career title and give a short description (2-3 sentences) about what this person does in that job.
Respond in a friendly and encouraging tone.
`;
}

async function getCareerFromAI(prompt, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API returned status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

function createResultHTML(text) {
  return `
    <div class="result-box">
      <p>${text.replace(/\n/g, '<br>')}</p>
    </div>
  `;
}

function displayFallbackResult() {
  // fallback based on keywords count
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

  const bestCareer = careerMatches[bestIndex];

  careerResult.innerHTML = `
    <div class="result-box">
      <h2>${bestCareer.title}</h2>
      <p>${bestCareer.description}</p>
      <p><em>Nature's Career Compass was happy to assist you on your journey!</em></p>
    </div>
  `;

  addResultAnimation();
}

function addResultAnimation() {
  // De versiersel en animatie komen via CSS (popIn & floatLeaves)
}

// Automatisch quiz resetten na 15 seconden met outro tekst
resultSection.addEventListener('animationend', () => {
  setTimeout(() => {
    resultSection.classList.add('hidden');
    introSection.classList.remove('hidden');
    userAnswers.length = 0;
    currentQuestionIndex = 0;
    nextBtn.classList.add('hidden');
  }, 15000);
});
