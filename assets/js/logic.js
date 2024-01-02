// ---------- setting initial window load ----------
// window.location.href = "index.html";

// array called 'questions'
// with 5 objects inside of it
// these 5 objects hold two objects inside of them: 
// the 'question' key-value pair, 
// and the answer key, which the value is a (nested) array which holds 4 more objects
// these four objects each hold two elements, or key value pairs
// text (with the answer text) and correct (with a boolean value)

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

// ---------- creating initial variables ----------
const startContainer = document.querySelector('#startContainer'); // start container
const questionsContainer = document.querySelector('#questionContainer'); // questions container
const startBtn = document.querySelector('#startBtn'); // start button of start container
const questionElement = document.getElementById("question"); // this is the h2 in the question container
const answerBtns = document.querySelector('.answerBtnContainer'); // this isn't the answer buttons themsleves, but the container (div) they are wrapped in
const nextBtn = document.getElementById("nextBtn"); // this is the next button
const timerDisplay = document.getElementById("timerBtn"); // this is the timer display button
const submitBtn = document.getElementById("submitBtn"); // submit btn
const scoresBtnTwo = document.querySelector('#scoresBtnTwo'); // scores btn
let userInputName = document.querySelector('#userInputName') // this is the input tag and will hold the users inputted name


// ---------- more variables ----------
// use let for these as their value will change
let currentQuestionIndex = 0; // so we can end the quiz when all the questions have been asked
let userScore = 0; // keeps track of users score
let timeLeft = 60; // start time (initial number) and then tracks the time left
let timerInterval; // this is the variable that will store

// --------- start quiz function ----------
function startQuiz() {
    currentQuestionIndex = 0; // resets the current index
    userScore = 0; // resets the current user score
    nextBtn.innerHTML = "Next"; // resets the next button innerHTML to say 'next'
    showQuestion(); // runs the showQuestion function (see line 80)
    startTimer(); // runs the startTimer function (see line 102)
    answerBtns.style.display = 'inline'; // get answer buttons back (hidden on showScore function)
    timeLeft = 60; // reset time back to one minute
    userInputName.style.display = 'none'; // hide user scoreinput
    submitBtn.style.display = 'none'; // hide submit button
    timerDisplay.style.display = 'inline-block'; // show timer button
    scoresBtnTwo.style.display = 'none'; // hides scores button
};

// ---------- show question function ----------
function showQuestion() {
    resetState(); // runs the resetState function

    let currentQuestion = questions[currentQuestionIndex]; // creating currentQuestion variable and assigning it the value of 'questions' (which is our array that holds all the questions) plus the current index [0]
    let questionNo = currentQuestionIndex + 1; // creating another var called questionNo, which will add 1 to current question index (as first index is 0, but first question should be 1)
    questionElement.innerHTML = questionNo + ": " + currentQuestion.question; // here we are saying: the html within questionElement (the h2) is equal to questionNo (which is currentIndex + 1), + the appropiate text, + currentQuestion (which is the current index of the 'questions' array, '.question' which is the key of the object we want each time) 

    // forEach will run a function once per item in a specified array, in this case, 'answers'
    // it will loop over 
    currentQuestion.answers.forEach(answer => {
        // so for each item in answers...
        const button = document.createElement("button"); // create a button element, saved to 'button'
        button.innerHTML = answer.text; // button text will equal what is inside answer.text
        button.classList.add("btn") // add the 'btn' class to button
        answerBtns.appendChild(button); // add the new 'button' inside the button container ('')
        if (answer.correct) { // if the key 'correct' has the boolean value true, then run the line below
            button.dataset.correct = answer.correct; // asigns the dataset 'correct' to the button
        }
        button.addEventListener('click', selectAnswer); // selectAnswer function will run when 'button' is clicked (line 123)
    });
};

// ---------- start timer function ----------
function startTimer() { // start timer function
    timerInterval = setInterval(() => { // timerInterval we created earlier will now hold the 'id' of setInterval (this allows us to stop the timer (line 108))
        timeLeft--; // every time this function runs (every second), decrease timeLeft by 1 
        timerDisplay.textContent = `Time: ${timeLeft}s`; // template literal to display time left in the timeDisplay button
        if (timeLeft === 0) { // end timer if timeLeft = 0
            clearInterval(timerInterval); // clearInterval stops the timer (we parse in timerInterval which holds the interval 'id')
            showScore(); // run showScore function when timer ends
        }
    }, 1000); // 1000 miliseconds = 1 second (how often the function runs)
};

// ---------- reset state function ----------
function resetState() {
    nextBtn.disabled = true; // disable next button 
    while(answerBtns.firstChild) { // as long as answerButtons has a firstChild (a child)
        answerBtns.removeChild(answerBtns.firstChild); // then remove that firstChild (so removes all 'childs' (elements within answerBtns container))
    }
};

// ---------- select answer ----------
function selectAnswer(e) { // creating selectAnswer function, with an argument of 'e' (event)
    const selectedBtn = e.target; // selectedBtn stores the button that triggered the event
    const isCorrect = selectedBtn.dataset.correct === "true"; // basically, isCorrect is equal to the correct 'true' answer
    if (isCorrect) { // if it does, do the following...
        selectedBtn.classList.add("correct"); // add the 'correct' class to that button
        userScore++; // add one to the score
        console.log(userScore); // console log the new score
    } else { // if not, do this...
        selectedBtn.classList.add("incorrect"); // add the incorrect class to that button
        timeLeft = timeLeft - 10;
    }
    Array.from(answerBtns.children).forEach(button => {  // itterates through the children of answerBtns, 
        if (button.dataset.correct === "true") { // if dataset is true...
            button.classList.add("correct"); // add class of 'correct' to that button
        }
        button.disabled = true; // then... disable all buttons
    });
    nextBtn.disabled = false; // enables the next button so the user can move onto the next question
};

// ---------- show score -----------
function showScore() { // function to show score
    resetState(); // run the resetState function
    questionElement.innerHTML = `You scored ${userScore} out of ${questions.length}!`; // change the h2 text to display score using a template literal
    answerBtns.style.display = 'none'; // don't need answer btn container on showScore screen
    userInputName.style.display = 'inline'; // make user score input box visible
    nextBtn.disabled = false; // next button will work, but will become play again (see below)
    nextBtn.innerHTML = "Play Again"; // change the nextBtn text to 'play again'
    nextBtn.style.display = "block"; // change the nextBTN display to block
    clearInterval(timerInterval); // when showScore function runs it means the quiz has either beeen completed, so stop the timer
    timerDisplay.style.display = 'none'; // hide timer button
    submitBtn.disabled = false; // enable submit button
    submitBtn.style.display = 'inline-block'; // show submit button
    scoresBtnTwo.style.display = 'inline-block'; // hides scores button
};

// ---------- handle next button ----------
function handleNextBtn() { // function to decide (if else stament) what happens to the nextBtn
    currentQuestionIndex++; // every time the function is run, add one to currentQuestionIndex
    if (currentQuestionIndex < questions.length) { // if currentQuestionIndex is less than the amount of questions, then... 
        showQuestion(); // run the showQuestion function (next question) as you've added pone to the corresponding index
    } else { // otherwise, (the quiz is over, so...)
        showScore(); // run the showScore function 
    }
};

// ---------- nextBtn event listener -----------
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) { // if (when nextBtn is clicked) there are still questions remaining, then...
        handleNextBtn(); // run the handleNextBtn function (line 152)
    } else { // if there are no more questions remaining, the nextBtn will...
        questionsContainer.style.display = 'none'; // hide the questions container
        startContainer.style.display = 'block'; // show the start screen
        // submitBtn.style.display = 'none'; // hide submit button
        // timerDisplay.style.display = 'inline-block'; // show timer button
    }
});

// ---------- run start quiz function ----------
startBtn.addEventListener('click', function() { // when startBtn is clicked
    startContainer.style.display = 'none'; // hide start container
    questionsContainer.style.display = 'block'; // show questions container
    startQuiz(); // run the startQuiz function
});


// ---------- leaderboard section ----------

// ---------- initialising userObject object ----------
let userObject = {
    newName: "", // empty string
    score: 0 // score is equal to score
};

// ---------- submitBtn event listener ----------
submitBtn.addEventListener('click', function() {
    const userName = userInputName.value; // new variable userName is equal to the value of userInputName (what the user has inputed)
    console.log(`Inputted name is: ${userName}`); // to check userName
    userObject.newName = userName; // the name object within userObject is now equal to the value of userName (what the user inputed)
    userObject.score = userScore; // the score object with userObject is now equal to the value of userScore
    console.log(userObject); // to check userObject

    // ---------- stringify userObject ----------
    const userJSON = JSON.stringify(userObject); // creating a new variable called userJSOn (which is a userObject but stringified)

    // ---------- set item in local storage ----------
    localStorage.setItem("userData", userJSON); // setting userJSON to local storage

    submitBtn.disabled = true;
});




// add sounds lol



