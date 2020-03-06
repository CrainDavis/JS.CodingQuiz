/////////////////////////////////// VARIABLES ///////////////////////////////////
var finalScore = document.getElementById("finalScore");
var usernameInput = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");

var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highScores);

var userScore = localStorage.getItem("userScore"); // user score from local storage ...
finalScore.innerText = userScore; // displayed on submit-highscores-page.html

/////////////////////////////////// FUNCTIONS ///////////////////////////////////
// function to make SaveScore Button work; when the user types their name into the input field and clicks "save", their name and score will be added to localStorage as values in an array, and the page will be redirected to the View Highscores page, where they will see their score listed
saveScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var userAndScore = [usernameInput.value, userScore];

    highScores.push(userAndScore);

    localStorage.setItem("highscores", JSON.stringify(highScores));

    return window.location.assign("view-highscores-page.html");
});