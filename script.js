var questionJsonObj;
var onQuestionNum = 0; // Increment this every time a question is answered
var score = 0;
var questionDifficulty = ["easy", "medium", "hard"];
var questionCount = 10
var hideItems = document.getElementsByClassName("hideMe");

var minutes = 3;
var totalSeconds = 60 * minutes;

var timerElem = document.getElementById("timer");


function beginGame() {
    $.getJSON('https://opentdb.com/api.php?amount=' + questionCount + '&category=18&type=multiple', function (data) {
        // JSON result in `data` variable
        if (data.response_code === 0) {
            console.log("Got response!")
            questionJsonObj = data.results;

            for (var i = 0; i < hideItems.length; i++) {
                hideItems[i].style.display = "none";
            }

            var display = document.querySelector('#time');
            startTimer(totalSeconds, display);

            populateHtmlWithQuestion();
        } else {
            alert("Error getting question data from API!")
        }
    });


}


function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function setScoreLocalStorage() {
    // Store the final score of the user with their initials
}

function populateHtmlWithQuestion() {
    // Based on the variable onQuestionNum populate the question data
    var question = document.getElementById("question");
    var answer_options = document.getElementsByClassName("answer");
    var scoreElem = document.getElementById("score");
    var answer_arr = questionJsonObj[onQuestionNum].incorrect_answers;

    answer_arr.push(questionJsonObj[onQuestionNum].correct_answer);

    question.innerText = questionJsonObj[onQuestionNum].question; // Set the #question to the question text
    scoreElem.innerText = score;

    for (var i = 0; i < answer_arr.length; i++) {
        answer_options[i].innerText = unescape(answer_arr[i]);
    }

}


function getAnswerText(obj) {
    var answerText = obj.innerText;
    console.log(answerText);
    checkAnswerText(answerText);
}


function resetQAElems() {
    // Set the Question and answer elements to blank again
}


function checkAnswerText(answerText) {

    if (onQuestionNum < questionCount - 1) {
        if (questionJsonObj[onQuestionNum].correct_answer == answerText) {
            // The user answered the question correctly so do the proper logic here
            // Points added are based on the question difficulty
            var pointsToAdd = questionDifficulty.indexOf(questionJsonObj[onQuestionNum].difficulty) + 1
            score += pointsToAdd;
            console.log("Question #" + onQuestionNum + " answered correctly!");
        } else {
            // The user answered the question incorrectly so do the proper logic here
            console.log("Question #" + onQuestionNum + " answered incorrectly!");
        }

        onQuestionNum += 1;
        populateHtmlWithQuestion();
    } else {
        alert("You got a score of: " + score + "! In a total of " + questionCount + " questions!")

        for (var i = 0; i < hideItems.length; i++) {
            hideItems[i].style.display = "block";
        }
    }

}