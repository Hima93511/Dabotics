const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Warren Buffet"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Indian", "Pacific", "Atlantic", "Arctic"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
const threshold = 2; // Set the threshold for winning

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const quizContainer = document.getElementById('quiz');
const resultMessage = document.getElementById('result-message');
const resultGif = document.getElementById('result-gif');
const restartButton = document.getElementById('restart-btn');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    answersElement.innerHTML = '';
    currentQuizData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.innerText = answer;
        button.addEventListener('click', () => selectAnswer(index));
        const li = document.createElement('li');
        li.appendChild(button);
        answersElement.appendChild(li);
    });
}

function selectAnswer(selected) {
    const correctAnswer = quizData[currentQuestion].correct;
    if (selected === correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    if (score >= threshold) {
        resultMessage.innerText = 'Congratulations! You are a winner!';
        resultGif.src = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';
    } else {
        resultMessage.innerText = 'Sorry! You lost the game.';
        resultGif.src = 'https://media.giphy.com/media/3og0IPxMM0erATueVW/giphy.gif';
    }
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', restartQuiz);

// Start the quiz
loadQuestion();
