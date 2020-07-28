var questionJsonObj;
var onQuestionNum = 0; // Increment this every time a question is answered
var score = 0;
var questionDifficulty = ["easy", "medium", "hard"];

$.getJSON('https://opentdb.com/api.php?amount=10&category=18&type=multiple', function (data) {
    // JSON result in `data` variable
    questionJsonObj = data;
});


function timer() {
    // Do countdown timer logic here
}


function setScoreLocalStorage() {
    // Store the final score of the user with their initials
}

function populateHtmlWithQuestion() {
    // Based on the variable onQuestionNum populate the question data
    var questionObj = questionJsonObj[onQuestionNum];
    var question = document.getElementById("question");
    var answer_options = document.getElementsByClassName("answer");
    var answer_arr = questionObj.incorrect_answers;
    answer_arr.push(questionObj.correct_answer);
    shuffle(answer_arr);

    question.innerText = questionObj.question; // Set the #question to the question text

    for (var i = 0; i < answer_arr.length; i++) {
        answer_options[i].innerText = answer_arr[i];
    }

}


function getAnswerText(this) {
    var answerText = this.innerText;
    checkAnswerText(answerText);
}

function checkAnswerText(answerText) {
    var questionObj = questionJsonObj[onQuestionNum];

    if (questionObj.correctAnswern === answerText) {
        // The user answered the question correctly so do the proper logic here
        // Points added are based on the question difficulty
        var pointsToAdd = questionDifficulty.indexOf(questionObj.difficulty) + 1
        score += pointsToAdd;
        console.log("Question #" + onQuestionNum + " answered correctly!");

    } else {
        // The user answered the question incorrectly so do the proper logic here
        console.log("Question #" + onQuestionNum + " answered incorrectly!");
    }
}