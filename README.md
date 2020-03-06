# CodeQuiz
## Project Description:
This is a JavaScript coding quiz that tests the player's knowledge of beginner-level JavaScript facts. Upon opening the application the user is guided to the Start Page, which provides the following instructions, a Start Quiz button, and a View Highscores button.
Instructions:
```
Answer 10 multiple-choice questions in 60 seconds! If you choose the wrong answer, 5 seconds will be subracted from the timer! If all questions have been answered before time runs out, input your name and record your score! But, if you run out of time, it's GAM E OVER!
```
Upon clicking the Start Quiz button, the user will be guided to the Quiz Page, where they will be presented with a question and four possible answers. As they answer each question, a new one will appear. The question order is randomized for each play-through. The page is also designed to display the player's stats (current question, score, and time remaining). If the timer reaches 0, the player will see the Game Over Page, and will have the option to try the quiz again. If they are able to answer all ten questions within the time limit, the player will be redirected to a Highscore Submissions page. Here, they can enter their name into the input box, click the Save button, and save their score forever. Upon being redirected to the View Highscores Page, the player can see all of their previous scores (and delete them if they so desire).
## The Coding Process:
This application consists of 5 HTML pages, 1 CSS stylesheet, and 3 JavaScript files. The HTML pages are fairly minimal, as much of the content is populated via JavaScript (ie, the questions & answers, the quiz page-top stats, etc.). This quiz application was also designed with various viewport sizes in mind, and the CSS page reflects this through the use of media queries. Lastly, this application makes much use of Local Storage, which allows the application to store the player's name and score, and display them across various pages.
## URLs:
* Deployed Application: https://craindavis.github.io/JS.CodingQuiz/
* Repository: https://github.com/CrainDavis/JS.CodingQuiz
