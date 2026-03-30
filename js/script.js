// js/script.js - Main Logic with Timer & PDF Support

let timerInterval;
let timeLeft = 1800; // 30 minutes in seconds

// ==================== QUESTIONS BY CLASS ====================
const questionsByClass = {
    4: [
        { subject: "Mathematics", question: "What is 8 + 7?", options: ["12", "14", "15", "17"], answer: 2 },
        { subject: "Science", question: "What do we breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 0 },
        { subject: "English", question: "Opposite of Big is?", options: ["Tall", "Small", "Heavy", "Fast"], answer: 1 },
        { subject: "Mathematics", question: "What is 5 × 6?", options: ["25", "30", "35", "40"], answer: 1 },
        { subject: "Science", question: "Which animal is known as the ship of the desert?", options: ["Horse", "Camel", "Elephant", "Donkey"], answer: 1 },
        // Add 15 more real questions for Class 4 if you want
    ],
    5: [
        { subject: "Mathematics", question: "What is 15% of 200?", options: ["20", "30", "40", "50"], answer: 1 },
        { subject: "Science", question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
        { subject: "Geography", question: "What is the capital of Nepal?", options: ["Pokhara", "Kathmandu", "Biratnagar", "Lumbini"], answer: 1 },
        { subject: "English", question: "Synonym of Happy?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
        // Add more...
    ],
    6: [
        { subject: "Mathematics", question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: 2 },
        { subject: "History", question: "Who was the first President of USA?", options: ["Lincoln", "Washington", "Jefferson", "Adams"], answer: 1 },
        { subject: "Science", question: "What is water's chemical formula?", options: ["H2O", "CO2", "O2", "NaCl"], answer: 0 },
        // Add more...
    ],
    7: [
        { subject: "Science", question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], answer: 1 },
        { subject: "Geography", question: "Mount Everest is in which country?", options: ["India", "Nepal", "China", "Bhutan"], answer: 1 },
        // Add more...
    ],
    8: [
        { subject: "Mathematics", question: "Solve: x + 5 = 12", options: ["5", "7", "8", "17"], answer: 1 },
        { subject: "History", question: "When did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
        // Add more...
    ],
    9: [
        { subject: "Science", question: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Fe", "Cu"], answer: 0 },
        { subject: "Geography", question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
        // Add more...
    ]
};

// Fill to exactly 20 questions per class
Object.keys(questionsByClass).forEach(cls => {
    while (questionsByClass[cls].length < 20) {
        questionsByClass[cls].push(...questionsByClass[cls].slice(0, 5));
    }
    questionsByClass[cls] = questionsByClass[cls].slice(0, 20);
});

// ==================== STATE VARIABLES ====================
let currentClass = null;
let studentName = "";
let currentIndex = 0;
let userAnswers = [];
let score = 0;
let currentQuestions = [];

// ==================== HELPER FUNCTIONS ====================
function getSubjectEmoji(subject) {
    const emojis = { "Mathematics": "🔢", "Science": "🧪", "History": "📜", "Geography": "🌍", "English": "📖" };
    return emojis[subject] || "📝";
}

function calculateScore() {
    score = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] === currentQuestions[i].answer) score++;
    }
    return score;
}

function updateProgress() {
    const percent = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('current-q').textContent = currentIndex + 1;
    document.getElementById('total-q').textContent = currentQuestions.length;
}

// ==================== TIMER FUNCTIONS ====================
function startTimer() {
    timeLeft = 1800; // 30 minutes
    const timerEl = document.getElementById('timer-display');
    timerEl.classList.remove('hidden');

    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('time-left').textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 300) { // Last 5 minutes
            document.getElementById('time-left').classList.add('!text-red-600');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Time's Up! Your test is being submitted automatically.");
            finishQuiz();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    document.getElementById('timer-display').classList.add('hidden');
}

// ==================== CLASS SELECTION ====================
function createClassButtons() {
    const container = document.getElementById('class-buttons');
    container.innerHTML = '';
    
    for (let cls = 4; cls <= 9; cls++) {
        const btn = document.createElement('button');
        btn.className = `py-6 px-8 text-2xl font-semibold rounded-3xl transition-all hover:scale-105 border-2 border-transparent 
                        ${cls % 2 === 0 ? 'bg-white shadow hover:shadow-xl' : 'bg-blue-50 hover:bg-blue-100'}`;
        btn.innerHTML = `Class ${cls}`;
        btn.onclick = () => selectClass(cls);
        container.appendChild(btn);
    }
}

function selectClass(cls) {
    currentClass = cls;
    document.getElementById('class-screen').classList.add('hidden');
    document.getElementById('info-screen').classList.remove('hidden');
    
    document.getElementById('selected-class-display').textContent = `Class ${cls}`;
    document.getElementById('student-name').focus();
}

// ==================== START QUIZ ====================
function startQuiz() {
    studentName = document.getElementById('student-name').value.trim();
    
    if (!studentName) {
        alert("Please enter your full name!");
        document.getElementById('student-name').focus();
        return;
    }

    currentQuestions = questionsByClass[currentClass];
    currentIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    
    document.getElementById('info-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    
    document.getElementById('student-info-bar').innerHTML = `
        <span class="font-medium">${studentName}</span> • Class ${currentClass}
    `;
    
    startTimer();           // Start 30 min timer
    renderQuestion();
}

// ==================== QUIZ RENDER & CONTROLS ====================
function renderQuestion() {
    const q = currentQuestions[currentIndex];
    
    document.getElementById('subject-badge').innerHTML = `
        <span class="text-xl">${getSubjectEmoji(q.subject)}</span>
        <span>${q.subject}</span>
    `;
    
    document.getElementById('question-text').innerHTML = `
        <span class="text-blue-600 font-medium">Q${currentIndex + 1}.</span> ${q.question}
    `;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const isSelected = userAnswers[currentIndex] === index;
        
        const btn = document.createElement('button');
        btn.className = `option-btn w-full text-left px-6 py-5 rounded-3xl border-2 flex items-center gap-4 text-lg font-medium 
                        ${isSelected ? 'selected border-blue-600' : 'border-slate-200 hover:border-blue-200'}`;
        btn.innerHTML = `
            <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-2xl border font-mono text-sm
                        ${isSelected ? 'bg-white text-blue-600 border-blue-600' : 'bg-slate-100 text-slate-400 border-slate-300'}">
                ${String.fromCharCode(65 + index)}
            </span>
            <span>${option}</span>
        `;
        btn.onclick = () => {
            userAnswers[currentIndex] = index;
            renderQuestion();
        };
        container.appendChild(btn);
    });
    
    document.getElementById('prev-btn').style.display = currentIndex === 0 ? 'none' : 'flex';
    
    if (currentIndex === currentQuestions.length - 1) {
        document.getElementById('next-text').innerHTML = `Finish Test <span class="ml-1">🏁</span>`;
    } else {
        document.getElementById('next-text').innerHTML = `Next →`;
    }
    
    updateProgress();
}

function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

function finishQuiz() {
    calculateScore();
    showResults();
}

function showResults() {
    stopTimer();                    // Stop timer when test ends
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    document.getElementById('score-text').textContent = score;
    document.getElementById('result-student-name').textContent = `${studentName} • Class ${currentClass}`;
    
    const offset = 94.2 - (94.2 * percentage / 100);
    document.getElementById('score-circle').setAttribute('stroke-dashoffset', offset);
    
    const msgEl = document.getElementById('result-message');
    if (percentage >= 80) msgEl.innerHTML = `🎉 Excellent! You scored <span class="text-emerald-600">${score}/20</span>`;
    else if (percentage >= 60) msgEl.innerHTML = `👍 Good Job! You scored <span class="text-amber-600">${score}/20</span>`;
    else msgEl.innerHTML = `📚 Keep practicing! You scored <span class="text-red-500">${score}/20</span>`;
    
    document.getElementById('correct-count').textContent = score;
    document.getElementById('wrong-count').textContent = currentQuestions.length - score;
}

// ==================== PDF EXPORT ====================
function exportResultPDF() {
    if (typeof exportToPDF === 'function') {
        exportToPDF(studentName, currentClass, score, currentQuestions.length);
    } else {
        alert("PDF library is not loaded. Please refresh the page and try again.");
    }
}

// ==================== RESTART & NAVIGATION ====================
function restartQuiz() {
    stopTimer();
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('info-screen').classList.remove('hidden');
}

function goToClassSelection() {
    stopTimer();
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('class-screen').classList.remove('hidden');
}

// ==================== INITIALIZE APP ====================
window.onload = () => {
    createClassButtons();
    console.log('%c✅ MCQ Test App with Timer + PDF Export is Ready!', 'color: #3b82f6; font-weight: bold;');
};