//     // Array of questions for the horror movies quiz
    const questions = [
        {
            question: "What is the name of the killer in the 'A Nightmare on Elm Street' series?",
            answers: [
                { text: "Michael Myers", correct: false },
                { text: "Freddy Krueger", correct: true },
                { text: "Jason Voorhees", correct: false },
                { text: "Ghostface", correct: false }
            ]
        },
        {
            question: "Which 1980s horror movie features a group of teenagers being stalked by a killer at a summer camp?",
            answers: [
                { text: "The Shining", correct: false },
                { text: "The Texas Chainsaw Massacre", correct: false },
                { text: "Friday the 13th", correct: true },
                { text: "The Exorcist", correct: false }
            ]
        },
        {
            question: "What is the name of the haunted hotel in 'The Shining'?",
            answers: [
                { text: "The Overlook Hotel", correct: true },
                { text: "The Bates Motel", correct: false },
                { text: "The Briarcliff Manor", correct: false },
                { text: "The Colehaven Hotel", correct: false }
            ]
        },
        {
            question: "Which 1980s horror movie features a killer doll?",
            answers: [
                { text: "Poltergeist", correct: false },
                { text: "The Thing", correct: false },
                { text: "Child's Play", correct: true },
                { text: "Hellraiser", correct: false }
            ]
        },
        {
            question: "Which actress played Laurie Strode in Halloween?",
            answers: [
                { text: "Jamie Lee Curtis", correct: true },
                { text: "Sigourney Weaver", correct: false },
                { text: "Neve Campbell", correct: false },
                { text: "Linda Hamilton", correct: false }
            ]
        },
        {
            question: "What supernatural power does Carrie have in the movie Carrie?",
            answers: [
                { text: "Mind Reading", correct: false },
                { text: "Telekinesis", correct: true },
                { text: "Invisibility", correct: false },
                { text: "Time Travel", correct: false }
            ]
        },
        {
            question: "Which horror movie features the Necronomicon Ex-Mortis?",
            answers: [
                { text: "Hellraiser", correct: false },
                { text: "The Evil Dead", correct: true },
                { text: "Pet Sematary", correct: false },
                { text: "The Craft", correct: false }
            ]
        },
        {
            question: "What was the original title of The Thing?",
            answers: [
                { text: "The Thing from Another World", correct: true },
                { text: "It Came from Space", correct: false },
                { text: "The Creature", correct: false },
                { text: "The Monster", correct: false }
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