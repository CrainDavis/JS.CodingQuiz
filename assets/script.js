/////////////////////////////////// VARIABLES ///////////////////////////////////
var question = document.getElementById("question"); // quiz-page line 38
var choices = Array.from(document.getElementsByClassName("choice-text")); // quiz-page line 42-45
var questionCounterText = document.getElementById("questionCounter"); // quiz-page HUD line 23
var scoreText = document.getElementById("score"); // quiz-page HUD line 28
var countdownTimerText = document.getElementById("countdownTimer"); // quiz-page HUD line 33

var currentQuestion = {}; // object for questions
var acceptingAnswers = false; // create short delay between questions
var score = 0; // keep score
var questionCounter = 0; // keep track of question number
var availableQuestions = []; // begin with full questions array, and remove them from this variable as they are answered by user
var correctScore = 10; // points for each correct answer; incremented
var totalQuestions = 10; // total number of questions user will answer; the number of questions in the array (below) could potentially exceed the number of questions the user actually answers

/////////////////////////////////// QUESTIONS ARRAY ///////////////////////////////////
var questions = [ // questions array with 10 questions as 10 objects; each object has a question, four choices, and the answer indicating which choice is the correct one
    {
        question: "(+ * - / %)\nWhat are these symbols called?",
        choice1: "arithmetic operators",
        choice2: "arithmetic symbols",
        choice3: "mathematic signs",
        choice4: "math symbols",
        answer: 1
    },
    {
        question: "Which of the following is NOT used to hold values?",
        choice1: "let",
        choice2: "set",
        choice3: "var",
        choice4: "const",
        answer: 2
    },
    {
        question: "Most JavaScript programmers use what kind of style to name variables?",
        choice1: "alllowercase",
        choice2: "spaced_apart_words",
        choice3: "CapitalizeEachWord",
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
        choice3: "or if",
        choice4: "else",
        answer: 3
    }
];

/////////////////////////////////// FUNCTIONS ///////////////////////////////////
// START QUIZ FUNCTION start //
function startQuiz() { 
    questionCounter = 0; // (re)set question counter (in HUD) to 0
    score = 0; // (re)set score tracker (in HUD) to 0
    availableQuestions = [...questions]; // copy in questions from array; [...] is the spread operator
    newQuestion(); // call on newQuestion function; sets up the first question to appear on page
}
// START QUIZ FUNCTION finish //

// NEW QUESTION FUNCTION start //
function newQuestion() { 
    if(availableQuestions.length === 0 || questionCounter >= totalQuestions) { // ends the game after questions array runs out, or if the user answers 10 questions
        return window.location.assign("submit-highscores-page.html"); // once all questions are answered, user will be redirected to score submission page
    } 

    questionCounter++; // increment the question in HUD
    questionCounterText.innerText = questionCounter + " / " + totalQuestions; // changes the number in the HUD question counter's inner text

    var questionIndex = Math.floor(Math.random() * availableQuestions.length); // randomizes the question order
    currentQuestion = availableQuestions[questionIndex]; // picks the current question by using the randomly generated index number
    question.innerText = currentQuestion.question; // changes question's inner text

    choices.forEach( (choice) => { // gets the answer choices from the array for each of the four answers
        var number = choice.dataset["number"]; 
        choice.innerText = currentQuestion["choice" + number]; // changes the inner text of answers
    });

    availableQuestions.splice(questionIndex, 1); // splice removes already-used questions

    acceptingAnswers = true; // makes the user wait to answer question until everything is loaded; previously set as false
};
// NEW QUESTION FUNCTION finish //

// ANSWER CHOICES FUNTION start //
choices.forEach( (choice) => { // sets which ones are correct/incorrect, and uses CSS to change button colors
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return; // prevent user from answering question before page is done loading

        acceptingAnswers = false; // resets to false to make delay
        var selectedChoice = e.target; // sets selectedChoice to whatever the user chooses
        var selectedAnswer = selectedChoice.dataset["number"]; // sets the correct answer among the choices
        
        // sets answer choices (classes) to correct/incorrect colors when selected by user
        var classToApply = "incorrect"; // sets variable to incorrect color (red) as a default
            if(selectedAnswer == currentQuestion.answer) { // if the user chooses the correct answer...
                classToApply = "correct"; // ...then the class is changed to the correct color (green)
            }

        if(classToApply === "correct") { // if user selects the correct answer...
            addToScore(correctScore); // ...call the addToScore function (add points to the score tracker in HUD)
        } 

        selectedChoice.classList.add(classToApply); // applies the class (color red/green) to the user's selected choice

        setTimeout(function() { // create a delay between the correct/incorrect color display and the next question
            selectedChoice.classList.remove(classToApply); // removes the green/red color class
            newQuestion(); // call newQuestion function to get a new question
        }, 500); // gives a delay of 0.5 seconds
    });
})
// ANSWER CHOICES FUNTION finish //

// ADD TO SCORE FUNCTION start //
function addToScore(points) { // function that increases the score each time user answers a question correctly
    score += points; // increment the score in HUD
    scoreText.innerText = score; // changes inner text to reflect this score change
}
// ADD TO SCORE FUNCTION finish //

startQuiz(); // call on startQuiz function; quiz will start