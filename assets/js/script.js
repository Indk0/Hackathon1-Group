// Array of questions for the quiz
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "What is the capital of Brazil?",
        answers: [
            { text: "Brasília", correct: true },
            { text: "Rio de Janeiro", correct: false },
            { text: "São Paulo", correct: false },
            { text: "Lima", correct: false }
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Perth", correct: false }
        ]
    },
    {
        question: "What is the capital of South Africa?",
        answers: [
            { text: "Cape Town", correct: false },
            { text: "Pretoria", correct: true },
            { text: "Johannesburg", correct: false },
            { text: "Durban", correct: false }
        ]
    },
    {
        question: "Which city is the capital of Argentina?",
        answers: [
            { text: "Buenos Aires", correct: true },
            { text: "Santiago", correct: false },
            { text: "Lima", correct: false },
            { text: "Montevideo", correct: false }
        ]
    },
    {
        question: "What is the capital of South Korea?",
        answers: [
            { text: "Busan", correct: false },
            { text: "Incheon", correct: false },
            { text: "Seoul", correct: true },
            { text: "Daegu", correct: false }
        ]
    },
    {
        question: "Which city serves as the capital of Morocco?",
        answers: [
            { text: "Casablanca", correct: false },
            { text: "Marrakech", correct: false },
            { text: "Rabat", correct: true },
            { text: "Fez", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const heroContainer = document.getElementById("hero-container");
const questionText = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

// Start quiz automatically when page loads
window.onload = function() {
    startQuiz();
};

function startQuiz() {
    quizContainer.style.display = 'block';
    
    // Check if we're continuing a quiz
    const storedQuestion = localStorage.getItem('currentQuestion');
    if (storedQuestion) {
        currentQuestion = parseInt(storedQuestion);
        score = parseInt(localStorage.getItem('quizScore')) || 0;
    } else {
        // New quiz
        currentQuestion = 0;
        score = 0;
    }

    scoreElement.textContent = `Score: ${score}/${questions.length}`;
    
    // Check if quiz is complete
    if (currentQuestion >= questions.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

function loadQuestion() {
    // Clear previous feedback
    feedbackElement.textContent = '';
    
    // Clear previous answer buttons
    answerButtonsElement.innerHTML = '';
    
    // Load current question
    questionText.textContent = questions[currentQuestion].question;
    
    // Create answer buttons
    questions[currentQuestion].answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn", "btn-warning", "m-2"); // Using Bootstrap classes
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Get current topic from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentTopic = urlParams.get('topic');

    if (isCorrect) {
        score++;
        localStorage.setItem('quizScore', score);
        localStorage.setItem('isCorrect', 'true');
    } else {
        localStorage.setItem('quizScore', score);
        localStorage.setItem('isCorrect', 'false');
    }

    // Store topic and next question number
    localStorage.setItem('currentTopic', currentTopic);
    localStorage.setItem('currentQuestion', currentQuestion + 1); // Store next question
    localStorage.setItem('totalQuestions', questions.length);
    
    // Navigate to answer display page
    window.location.href = 'answerdis.html';
}

function endQuiz() {
    answerButtonsElement.innerHTML = '';
    questionText.textContent = "Quiz Complete!";
    feedbackElement.textContent = `Final Score: ${score}/${questions.length}`;
    feedbackElement.className = "mt-3";
    
    // Add restart button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("btn", "btn-primary", "mt-3");
    restartButton.addEventListener("click", () => {
        startQuiz();
    });
    answerButtonsElement.appendChild(restartButton);

    //Home Button
    const homeButton = document.createElement("button");
    homeButton.textContent = "Return to Home";
    homeButton.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
    homeButton.addEventListener("click", () => {
        window.location.href = 'index.html';
    });
    answerButtonsElement.appendChild(homeButton);
}