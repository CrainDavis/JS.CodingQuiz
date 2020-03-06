/////////////////////////////////// VARIABLES ///////////////////////////////////
var highscoreList = document.getElementById("highscoreList"); // ul
var clearAllBtn = document.getElementById("clearAll-btn");

/////////////////////////////////// FUNCTIONS ///////////////////////////////////

var userScores = [];

openPage();

function renderHighscores() {
    highscoreList.innerHTML = "";

    for (var i = 0; i < userScores.length; i++) {
        var userScore = userScores[i];
    
        var li = document.createElement("li");
        li.textContent = userScore[0] + " ----- " + userScore[1] + " points";
        li.setAttribute("data-index", i);
        li.classList.add("highscore-item");
    
        highscoreList.appendChild(li);
    }
}

function openPage() {
    var highScores = JSON.parse(localStorage.getItem("highscores"));
  
    if (highScores !== null) {
        userScores = highScores;
    }
  
    renderHighscores();
  }

// clearAllBtn function: adds event listener for the button, clears out the localStorage, and changes the inner HTML by showing the empty storage
clearAllBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    highscoreList.innerHTML = [];
});

// =================================================================================
// Resources:
// class activity (04-Web-APIs) | Day03 | 28-Stu-Local-Storage-Todos