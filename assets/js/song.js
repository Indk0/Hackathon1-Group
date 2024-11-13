// Array of questions for the song lyrics quiz
const questions = [
    {
        question: "What is the opening line to the song 'Wonderwall' by Oasis?",
        answers: [
            { text: "Today is gonna be the day", correct: true },
            { text: "Maybe", correct: false },
            { text: "I don't believe that anybody", correct: false },
            { text: "Backbeat, the word is on the street", correct: false }
        ]
    },
    {
        question: "Which song by The Police features the lyric: 'Every breath you take, and every move you make'?",
        answers: [
            { text: "Message in a Bottle", correct: false },
            { text: "Every Breath You Take", correct: true },
            { text: "Roxanne", correct: false },
            { text: "Don't Stand So Close to Me", correct: false }
        ]
    },
    {
        question: "Complete the Queen lyrics: 'Is this the real life...'",
        answers: [
            { text: "Is this just fantasy?", correct: true },
            { text: "Or is this just a dream?", correct: false },
            { text: "Is this the final scene?", correct: false },
            { text: "What's the reality?", correct: false }
        ]
    },
    {
        question: "Which song by The Smiths features the lyric: 'There is a light that never goes out'?",
        answers: [
            { text: "How Soon Is Now?", correct: false },
            { text: "This Charming Man", correct: false },
            { text: "There Is a Light That Never Goes Out", correct: true },
            { text: "Heaven Knows I'm Miserable Now", correct: false }
        ]
    },
    {
        question: "Which band released the hit song Sweet Child O' Mine?",
        answers: [
            { text: "Guns N' Roses", correct: true },
            { text: "Aerosmith", correct: false },
            { text: "Bon Jovi", correct: false },
            { text: "Mötley Crüe", correct: false }
        ]
    },
    {
        question: "What year was Michael Jackson's Thriller released?",
        answers: [
            { text: "1980", correct: false },
            { text: "1982", correct: true },
            { text: "1984", correct: false },
            { text: "1986", correct: false }
        ]
    },
    {
        question: "Who wrote and first performed the song Respect?",
        answers: [
            { text: "Aretha Franklin", correct: false },
            { text: "Otis Redding", correct: true },
            { text: "Sam Cooke", correct: false },
            { text: "Ray Charles", correct: false }
        ]
    },
    {
        question: "Which Pink Floyd album features the song Another Brick in the Wall?",
        answers: [
            { text: "Dark Side of the Moon", correct: false },
            { text: "The Wall", correct: true },
            { text: "Wish You Were Here", correct: false },
            { text: "Animals", correct: false }
        ]
    }
    
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

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
        currentQuestion = 0;
        score = 0;
    }

    scoreElement.textContent = `Score: ${score}/${questions.length}`;
    loadQuestion();
}

function loadQuestion() {
    feedbackElement.textContent = '';
    answerButtonsElement.innerHTML = '';
    questionText.textContent = questions[currentQuestion].question;
    
    questions[currentQuestion].answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn", "btn-warning", "m-2");
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

    if (isCorrect) {
        score++;
        localStorage.setItem('quizScore', score);
        localStorage.setItem('isCorrect', 'true');
    } else {
        localStorage.setItem('quizScore', score);
        localStorage.setItem('isCorrect', 'false');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const currentTopic = urlParams.get('topic');
    
    localStorage.setItem('currentTopic', currentTopic);
    localStorage.setItem('currentQuestion', currentQuestion + 1);
    localStorage.setItem('totalQuestions', questions.length);
    
    window.location.href = 'answerdis.html';
}

function endQuiz() {
    answerButtonsElement.innerHTML = '';
    questionText.textContent = "Quiz Complete!";
    feedbackElement.textContent = `Final Score: ${score}/${questions.length}`;
    
    const homeButton = document.createElement("button");
    homeButton.textContent = "Return to Home";
    homeButton.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
    homeButton.addEventListener("click", () => {
        window.location.href = 'index.html';
    });
    answerButtonsElement.appendChild(homeButton);
}