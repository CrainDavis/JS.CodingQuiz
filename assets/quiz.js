/////////////////////////////////// QUESTIONS ARRAY ///////////////////////////////////
var questions = [
    {
        question: "(+ * - / %)\nWhat are these symbols called?",
        choice1: "arithmetic operators",
        choice2: "arithmetic symbols",
        choice3: "mathematic signs",
        choice4: "math symbols",
        answer: 1
    },
    {
        question: "Which of the following CANNOT be used to declare a variable?",
        choice1: "let",
        choice2: "set",
        choice3: "var",
        choice4: "const",
        answer: 2
    },
    {
        question: "Most JavaScript programmers use what kind of style to name variables?",
        choice1: "alllowercase",
        choice2: "spaced_apart",
        choice3: "CapitalizeEach",
        choice4: "camelCase",
        answer: 4
    },
    {
        question: "Which of the following is NOT a kind of loop?",
        choice1: "for loop",
        choice2: "when loop",
        choice3: "while loop",
        choice4: "do loop",
        answer: 2
    },
    {
        question: "When writing JavaScript within an HTML document, what kind of tag does it need to be in?",
        choice1: "<head>",
        choice2: "<java>",
        choice3: "<script>",
        choice4: "<action>",
        answer: 3
    },
    {
        question: "What is the preferred method to debug JavaScript code?",
        choice1: "debug.log();",
        choice2: "console.log();",
        choice3: "errors.show();",
        choice4: "console.errors();",
        answer: 2
    },
    {
        question: "NaN means __?",
        choice1: "error",
        choice2: "Not a Number",
        choice3: "Not Applicable Number",
        choice4: "Need a Number",
        answer: 2
    },
    {
        question: "In an if statement, the logical operator || represents __?",
        choice1: "not",
        choice2: "and",
        choice3: "with",
        choice4: "or",
        answer: 4
    },
    {
        question: "How does a programmer write comments in JavaScript?",
        choice1: "//comment",
        choice2: "<!--comment-->",
        choice3: "/*comment*/",
        choice4: "((comment))",
        answer: 1
    },
    {
        question: "Which CANNOT be used in a conditional statement?",
        choice1: "if",
        choice2: "else if",
        choice3: "what if",
        choice4: "else",
        answer: 3
    }
];

/////////////////////////////////// VARIABLES ///////////////////////////////////
var question = document.getElementById("question"); // quiz-page line 38
var choices = Array.from(document.getElementsByClassName("choice-text")); // quiz-page line 42-45
var questionCounterText = document.getElementById("questionCounter"); // quiz-page page-top quizStats line 23
var scoreText = document.getElementById("score"); // quiz-page page-top quizStats line 28
var timeElement = document.getElementById("countdownTimer"); // quiz-page page-top quizStats line 33

var currentQuestion = {}; // object for questions
var acceptingAnswers = false; // create short delay between questions
var score = 0; // keep score
var timeLeft = 61; // countdown timer starts with 60 seconds on the clock; 61 is used here because the first decremented second does not appear to be displayed on the page due to slow rendering
var questionCounter = 0; // keep track of question number
var availableQuestions = []; // begin with full questions array, and remove them from this variable as they are answered by user
var correctScore = 10; // points for each correct answer; incremented
var totalQuestions = 10; // total number of questions user will answer

/////////////////////////////////// FUNCTIONS ///////////////////////////////////
// startQuiz Function: sets the page-top questionCounter and score to 0, copies in questions from array, and calls on the newQuestion function
function startQuiz() { 
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; 
    newQuestion();
}

// call on startQuiz function
startQuiz();
// call on the setTime Function
setTime();

// newQuestion Function: populates the inner text of the question and answer choices as the user goes through, increments the page-top stats, randomizes the question order and removes already-answered questions from array, ends the game after 10 questions, stores the user's score in local storage, and redirects the user to the submit highscores page
function newQuestion() { 
    if(availableQuestions.length === 0 || questionCounter >= totalQuestions) {
        localStorage.setItem("userScore", score);
        return window.location.assign("submit-highscores-page.html");
    } 

    questionCounter++;
    questionCounterText.textContent = questionCounter + " / " + totalQuestions;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.textContent = currentQuestion.question;

    choices.forEach( function(choice) {
        var number = choice.dataset["number"]; 
        choice.textContent = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

// answerChoices Function: uses a forEach function for the 4 answer choices; prevents user from clicking any answer choices before page finishes loading, changes the CSS color of the buttons to show whether user's choice was correct or incorrect, uses a setTimeout Function to make this color effect last for 0.2 seconds before calling the newQuestion Function. This function uses classes applied to decide whether the user's selected answer is correct or incorrect. The default is incorrect, and if the user chooses the correct answer, the answer's class will be changed through the classList.add() method. If the user selects the wrong answer, the class will remain as "incorrect", and the timePenalty function will be called, causing the timer to subtract 5 seconds.
choices.forEach( function(choice) {
    choice.addEventListener("click", function(e) {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset["number"];
        
        var classToApply = "incorrect"; 
            if(selectedAnswer == currentQuestion.answer) {
                classToApply = "correct"; 
            } else {
                timePenalty();
            }

        if(classToApply === "correct") { 
            addToScore(correctScore); 
        } 

        selectedChoice.classList.add(classToApply); 

        setTimeout(function() { 
            selectedChoice.classList.remove(classToApply); 
            newQuestion(); 
        }, 200);
    });
})

// addToScore Function: increases the score in the page-top stats each time the user answers a question correctly
function addToScore(points) { 
    score += points; 
    scoreText.textContent = score; 
}

// setTime Function: creates the timer in the page-top quiz stats and redirects to the GAMEOVER page if the timer reaches 0
function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--; 
        timeElement.textContent = timeLeft;

        if(timeLeft === 0) { 
            clearInterval(timerInterval); 
            return window.location.assign("gameover-page.html"); 
        }
    }, 1000); // 1 Mississippi
}

function timePenalty() {
    timeLeft = timeLeft - 4; // though the penalty is said to be -5 seconds in the instructions, I use -4 here because the setTimeout Function takes about a second to finish
}

// =================================================================================
// Resources:
// James Q Quick, "Build a Quiz App with HTML, CSS, and JavaScript", URL: "https://www.youtube.com/playlist?list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx".
    // "Build a Quiz App (3) - Display Hard-Coded Questions"
    // "Build a Quiz App (4) - Display Feedback for Correct/Incorrect Answers"
    // "Build a Quiz App (5) - Create a Head's Up Display"