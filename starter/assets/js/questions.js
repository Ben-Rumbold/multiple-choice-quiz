// // ---------- start to question one ----------
// let startBtn = document.querySelector('#startBtn');
// let startContainer = document.querySelector('#containerStart');
// let questionOneContainer = document.querySelector('#questionOneContainer');

// startBtn.addEventListener('click', function() {
//     startContainer.style.display = "none";
//     questionOneContainer.style.display = "block";
// });

// // ---------- question one to question two ----------
// let nextBtnQuestionOne = document.querySelector('#questionOneNextBtn');
// let questionTwoContainer = document.querySelector('#questionTwoContainer');

// nextBtnQuestionOne.addEventListener('click', function() {
//     questionOneContainer.style.display = "none";
//     questionTwoContainer.style.display = "block";
// });

// // ---------- question two to question three ----------
// let nextBtnQuestionTwo = document.querySelector('#questionTwoNextBtn');
// let questionThreeContainer = document.querySelector('#questionThreeContainer');

// nextBtnQuestionTwo.addEventListener('click', function() {
//     questionTwoContainer.style.display = "none";
//     questionThreeContainer.style.display = "block";
// });

// // ---------- question three to question four ----------
// let nextBtnQuestionThree = document.querySelector('#questionThreeNextBtn');
// let questionFourContainer = document.querySelector('#questionFourContainer');

// nextBtnQuestionThree.addEventListener('click', function() {
//     questionThreeContainer.style.display = "none";
//     questionFourContainer.style.display = "block";
// });

// // ---------- question four to question five ----------
// let nextBtnQuestionFour = document.querySelector('#questionFourNextBtn');
// let questionFiveContainer = document.querySelector('#questionFiveContainer');

// nextBtnQuestionFour.addEventListener('click', function() {
//     questionFourContainer.style.display = "none";
//     questionFiveContainer.style.display = "block";
// });

// --------------- new questions way ---------------
const questions = [
    {
        question: "What is the strict equality operator sign?",
        answers: [
            { text: '==', correct: false},
            { text: '===', correct: true},
            { text: '!==', correct: false},
            { text: '=', correct: false}
        ]
    },
    {
        question: "What does 'REPL' stand for?",
        answers: [
            { text: 'Read, Evaluate, Print, Length', correct: false},
            { text: 'Read, Evaluate, Parentheses, Loop', correct: false},
            { text: 'Read, Evaluate, Print, Loop', correct: true},
            { text: 'Read, Element, Print, Loop', correct: false}
        ] 
    },
    {
        question: "What does the 'push' array Method do?",
        answers: [
            { text: 'Adds a new element to the beggining of an array', correct: false},
            { text: 'Adds a new element to the end of an array', correct: true},
            { text: 'Removes an element from the beggining of an array', correct: false},
            { text: 'Removes an element from the end of an array', correct: false}
        ] 
    },
    {
        question: "How do you store values from a function for later use?",
        answers: [
            { text: 'save', correct: false},
            { text: 'console.log', correct: false},
            { text: 'run the function again', correct: false},
            { text: 'return', correct: true}
        ] 
    },
    {
        question: "What does 'DOM' stand for?",
        answers: [
            { text: 'Display Object Model', correct: false},
            { text: 'Document One Model', correct: false},
            { text: 'Document Object Model', correct: true},
            { text: 'Document Object Method', correct: false}
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.querySelector('.answerBtnContainer');
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timerBtn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
    startTimer();
};

function showQuestion() {
    // answerBtns.innerHTML = '';
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ": " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
};

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
}

function resetState() {
    nextBtn.disabled = true;
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
};


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        console.log(score);
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.disabled = false;
}

const startBtn = document.querySelector('#startBtn');
const startContainer = document.querySelector('#startContainer');
const questionContainer = document.querySelector('#questionContainer');
let userInput = document.querySelector('#inputName')
const showScoresContainer = document.querySelector('#showScoresContainer');
const displayScore = document.querySelector('#showScore');
const submitBtn = document.querySelector('#submitBtn');

startBtn.addEventListener('click', function() {
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    startQuiz();
});

// original showScore function
// function showScore() {
//     resetState();
//     showScore.innerHTML = `You scored ${score} out of ${questions.length}`;
//     nextBtn.innerHTML = "Play Again";
//     nextBtn.disabled = false;
//     answerBtns.style.display = 'none';
// }

function showScore() {
    resetState();
    displayScore.innerHTML = `You scored ${score} out of ${questions.length}`;
    questionContainer.style.display = "none";
    showScoresContainer.style.display = 'block';
    nextBtn.innerHTML = "Play Again Benji";
    nextBtn.disabled = false;
    answerBtns.style.display = 'none';
}

function handleNextBtn() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

function captureUserScore() {
    let userScoreObject = {
        name: userInput.value, // Assigning the user's input as the 'name' property of the object
        score: score // Assigning the score to the 'score' property of the object
      };
      console.log(userScoreObject);
}

submitBtn.addEventListener('click', function(){
    captureUserScore();
});


