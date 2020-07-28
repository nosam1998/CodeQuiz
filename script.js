var questionJsonObj;
var onQuestionNum = 0; // Increment this every time a question is answered
var score = 0;
var questionDifficulty = ["easy", "medium", "hard"];

$.getJSON('https://opentdb.com/api.php?amount=10&category=18&type=multiple', function (data) {
    // JSON result in `data` variable
    if (data.response_code === 0) {
        console.log("Got response!")
        questionJsonObj = data.results;
        populateHtmlWithQuestion();
    } else {
        alert("Error getting question data from API!")
    }
});


function timer() {
    // Do countdown timer logic here
}


function setScoreLocalStorage() {
    // Store the final score of the user with their initials
}

function populateHtmlWithQuestion() {
    // Based on the variable onQuestionNum populate the question data
    var question = document.getElementById("question");
    var answer_options = document.getElementsByClassName("answer");
    var answer_arr = questionJsonObj[onQuestionNum].incorrect_answers;
    answer_arr.push(questionJsonObj[onQuestionNum].correct_answer);

    question.innerText = questionJsonObj[onQuestionNum].question; // Set the #question to the question text

    for (var i = 0; i < answer_arr.length; i++) {
        answer_options[i].innerText = unescape(answer_arr[i]);
    }
    onQuestionNum += 1;
}


function getAnswerText(obj) {
    var answerText = obj.innerText;
    console.log(answerText);
    checkAnswerText(answerText);
}

function checkAnswerText(answerText) {
    if (questionJsonObj[onQuestionNum].correct_answer === answerText) {
        // The user answered the question correctly so do the proper logic here
        // Points added are based on the question difficulty
        var pointsToAdd = questionDifficulty.indexOf(questionJsonObj[onQuestionNum].difficulty) + 1
        score += pointsToAdd;
        console.log("Question #" + onQuestionNum + " answered correctly!");
        populateHtmlWithQuestion();
    } else {
        // The user answered the question incorrectly so do the proper logic here
        console.log("Question #" + onQuestionNum + " answered incorrectly!");
        populateHtmlWithQuestion();
    }

}