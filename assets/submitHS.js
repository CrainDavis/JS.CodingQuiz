// get user's final score from LOCAL STORAGE and display it on submit-highscores-page.html
var finalScore = document.getElementById("finalScore");
var userScore = localStorage.getItem("userScore");

finalScore.innerText = userScore;

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// FUNCTIONS ///////////////////////////////////
