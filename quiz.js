const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Delhi", correct: true },
            { text: "Mumbai", correct: false },
            { text: "Bangalore", correct: false },
            { text: "Chennai", correct: false },
        ]
    },
    {
        question: "What is the capital of Tamil Nadu?",
        answers: [
            { text: "Coimbatore", correct: false },
            { text: "Trichy", correct: false },
            { text: "Madurai", correct: false },
            { text: "Chennai", correct: true },
        ]
    },
    {
        question: "Who is the President of India?",
        answers: [
            { text: "Narendra Modi", correct: false },
            { text: "Droupadi Murmu", correct: true },
            { text: "Ramnath Kovind", correct: false },
            { text: "Pranab Mukherjee", correct: false },
        ]
    },
    {
        question: "Who is the Prime Minister of India?",
        answers: [
            { text: "Manmohan Singh", correct: false },
            { text: "Rahul Gandhi", correct: false },
            { text: "Narendra Modi", correct: true },
            { text: "Pranab Mukherjee", correct: false },
        ]
    },
    {
        question: "Who is the Chief Minister of Tamil Nadu?",
        answers: [
            { text: "Thalapathy Vijay", correct: false },
            { text: "M K Stalin", correct: true },
            { text: "Edappadi Palanisamy", correct: false },
            { text: "J Jayalalitha", correct: false },
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 120;

const startButton = document.getElementById('startButton');
const startContainer = document.getElementById('startContainer');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerButtons');
const timerElement = document.getElementById('time');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart');
const quizElement = document.getElementById('quiz');
const progressBar = document.getElementById('progressBar');

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    startContainer.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hide');
    quizElement.classList.remove('hide');
    progressBar.style.width = '0%'; // Initialize the progress bar to 0%
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    const feedbackElement = document.querySelector('.feedback');
    if (feedbackElement) {
        feedbackElement.remove();
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    showFeedback(correct);

    if (questions.length > currentQuestionIndex + 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            setNextQuestion();
            updateProgressBar();
        }, 1000);
    } else {
        setTimeout(showResult, 1000);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    timeLeft = 120;
    timerElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function showResult() {
    clearInterval(timer);
    quizElement.classList.add('hide');
    resultElement.classList.remove('hide');
    scoreElement.innerText = `${score}/${questions.length}`;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const scorePercentage = (score / questions.length) * 100;
    if (scorePercentage > 80) {
        messageElement.innerText = "Congratulations!";
    } else if (scorePercentage > 60) {
        messageElement.innerText = "Good!";
    } else {
        messageElement.innerText = "Do well next time!";
    }
    resultElement.appendChild(messageElement);
}

function showFeedback(correct) {
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    if (correct) {
        feedbackElement.innerText = "Correct!";
        feedbackElement.classList.add('correct');
    } else {
        feedbackElement.innerText = "Incorrect!";
    }
    questionContainer.appendChild(feedbackElement);
}
