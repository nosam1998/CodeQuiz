// Basic Info
var onQuestionNum = 0; // Increment this every time a question is answered
var score = 0;
var questionDifficulty = ["easy", "medium", "hard"];

// Timer
var minutes = 1;
var totalSeconds = 60 * minutes;
var timeLeft = totalSeconds;
var timerRunning = false;
var timerElem = document.getElementById("time");
var timerDiv = document.getElementById("timer-div");

// Getting elements
var hideItems = document.getElementsByClassName("hideMe");
var scoreDiv = document.getElementById("score-div");
var answer_options = document.getElementsByClassName("answer");
var question = document.getElementById("question");
var scoreElem = document.getElementById("score");

var menu_block = document.getElementById("menu-block");
var question_block = document.getElementById("question-block");
var form_block = document.getElementById("form-block");
var previousScoresElem = document.getElementById("previousScores");
var submitBtn = document.getElementById("submitBtn");
var clearScoresBtn = document.getElementById("clearScores");

// Question Object/Array
var questionObj = {
    "results": [{
            "difficulty": "easy",
            "question": "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
            "correct_answer": "1000",
            "incorrect_answers": ["512", "1024", "500"]
        },
        // {
        //     "difficulty": "medium",
        //     "question": "What does AD stand for in relation to Windows Operating Systems? ",
        //     "correct_answer": "Active Directory",
        //     "incorrect_answers": ["Alternative Drive", "Automated Database", "Active Department"]
        // }, {
        //     "difficulty": "easy",
        //     "question": "The programming language 'Swift' was created to replace what other programming language?",
        //     "correct_answer": "Objective-C",
        //     "incorrect_answers": ["C#", "Ruby", "C++"]
        // }, {
        //     "difficulty": "medium",
        //     "question": "What was the name given to Android 4.3?",
        //     "correct_answer": "Jelly Bean",
        //     "incorrect_answers": ["Lollipop", "Nutella", "Froyo"]
        // }, {
        //     "difficulty": "easy",
        //     "question": "In web design, what does CSS stand for?",
        //     "correct_answer": "Cascading Style Sheet",
        //     "incorrect_answers": ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"]
        // }, {
        //     "difficulty": "medium",
        //     "question": "While Apple was formed in California, in which western state was Microsoft founded?",
        //     "correct_answer": "New Mexico",
        //     "incorrect_answers": ["Washington", "Colorado", "Arizona"]
        // }, {
        //     "difficulty": "medium",
        //     "question": "Which one of these is not an official development name for a Ubuntu release?",
        //     "correct_answer": "Mystic Mansion",
        //     "incorrect_answers": ["Trusty Tahr", "Utopic Unicorn", "Wily Werewolf"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "Which of these was the name of a bug found in April 2014 in the publicly available OpenSSL cryptography library?",
        //     "correct_answer": "Heartbleed",
        //     "incorrect_answers": ["Shellshock", "Corrupted Blood", "Shellscript"]
        // }, {
        //     "difficulty": "medium",
        //     "question": "What is the correct term for the metal object in between the CPU and the CPU fan within a computer system?",
        //     "correct_answer": "Heat Sink",
        //     "incorrect_answers": ["CPU Vent", "Temperature Decipator", "Heat Vent"]
        // }, {
        //     "difficulty": "easy",
        //     "question": "What does LTS stand for in the software market?",
        //     "correct_answer": "Long Term Support",
        //     "incorrect_answers": ["Long Taco Service", "Ludicrous Transfer Speed", "Ludicrous Turbo Speed"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "Who is the original author of the realtime physics engine called PhysX?",
        //     "correct_answer": "NovodeX",
        //     "incorrect_answers": ["Ageia", "Nvidia", "AMD"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "What is the name of the process that sends one qubit of information using two bits of classical information?",
        //     "correct_answer": "Quantum Teleportation",
        //     "incorrect_answers": ["Super Dense Coding", "Quantum Entanglement", "Quantum Programming"]
        // }, {
        //     "difficulty": "medium",
        //     "question": "What is the main CPU is the Sega Mega Drive \/ Sega Genesis?",
        //     "correct_answer": "Motorola 68000",
        //     "incorrect_answers": ["Zilog Z80", "Yamaha YM2612", "Intel 8088"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "What does the International System of Quantities refer 1024 bytes as?",
        //     "correct_answer": "Kibibyte",
        //     "incorrect_answers": ["Kylobyte", "Kilobyte", "Kelobyte"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "What vulnerability ranked #1 on the OWASP Top 10 in 2013?",
        //     "correct_answer": "Injection ",
        //     "incorrect_answers": ["Broken Authentication", "Cross-Site Scripting", "Insecure Direct Object References"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "Who invented the 'Spanning Tree Protocol'?",
        //     "correct_answer": "Radia Perlman",
        //     "incorrect_answers": ["Paul Vixie", "Vint Cerf", "Michael Roberts"]
        // }, {
        //     "difficulty": "easy",
        //     "question": "Which programming language shares its name with an island in Indonesia?",
        //     "correct_answer": "Java",
        //     "incorrect_answers": ["Python", "C", "Jakarta"]
        // }, {
        //     "difficulty": "easy",
        //     "question": "In computing, what does MIDI stand for?",
        //     "correct_answer": "Musical Instrument Digital Interface",
        //     "incorrect_answers": ["Musical Interface of Digital Instruments", "Modular Interface of Digital Instruments", "Musical Instrument Data Interface"]
        // }, {
        //     "difficulty": "hard",
        //     "question": "Which of these is not a layer in the OSI model for data communications?",
        //     "correct_answer": "Connection Layer",
        //     "incorrect_answers": ["Application Layer", "Transport Layer", "Physical Layer"]
        // }, {
        //     "difficulty": "medium",
        //     "question": "The teapot often seen in many 3D modeling applications is called what?",
        //     "correct_answer": "Utah Teapot",
        //     "incorrect_answers": ["Pixar Teapot", "3D Teapot", "Tennessee Teapot"]
        // }
    ]
}


// Dynamic Version
// function beginGame() {
//     $.getJSON('https://opentdb.com/api.php?amount=' + questionCount + '&category=18&type=multiple', function (data) {
//         // JSON result in `data` variable
//         if (data.response_code === 0) {
//             console.log("Got response!")
//             questionObj.results = data.results;

//             for (var i = 0; i < hideItems.length; i++) {
//                 hideItems[i].style.display = "none";
//             }

//             var display = document.querySelector('#time');
//             startTimer(totalSeconds, display);

//             populateAnswerButtons();
//         } else {
//             alert("Error getting question data from API!")
//         }
//     });

// }

// Static Version


function showElem(elem, show) {
    if (show) {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}

function initialLoad() {
    showScores();
}

window.onload = initialLoad

function beginGame() {
    score = 0;
    onQuestionNum = 0;
    timeLeft = totalSeconds;
    timerRunning = true;
    showElem(menu_block, false); // Hide the menu
    showElem(question_block, true); // Show the questions and answers and hide the menu items
    populateAnswerButtons();
}


function timer() {
    if (timerRunning) {
        if (timeLeft === 0) {
            timerElem.textContent = "Seconds Left: 0";
            gameOver();
        } else {
            timeLeft -= 1;
            timerElem.textContent = "Seconds Left: " + timeLeft;
        }
    }
}


var intervalFunc = setInterval(timer, 1000);


function setScoreLocalStorage() {
    // Store the final score of the user with their initials
}

function populateAnswerButtons() {
    // Based on the variable onQuestionNum populate the question data

    var answer_arr = questionObj.results[onQuestionNum].incorrect_answers;

    var randIdx = Math.floor(Math.random() * answer_arr.length)

    answer_arr.splice(randIdx, 0, questionObj.results[onQuestionNum].correct_answer);
    console.log(answer_arr);
    question.innerText = questionObj.results[onQuestionNum].question; // Set the #question to the question text
    scoreElem.innerText = "Score: " + score;

    for (var i = 0; i < answer_arr.length; i++) {
        answer_options[i].textContent = answer_arr[i];
    }
}


function getAnswerText(obj) {
    var answerText = obj.innerText;
    console.log(answerText);
    checkAnswerText(answerText);
}


function checkAnswerText(answerText) {

    if (onQuestionNum < questionObj.results.length - 1) {
        if (questionObj.results[onQuestionNum].correct_answer == answerText) {
            // The user answered the question correctly so do the proper logic here
            // Points added are based on the question difficulty
            var pointsToAdd = questionDifficulty.indexOf(questionObj.results[onQuestionNum].difficulty) + 1;
            score += pointsToAdd;
            console.log("Question #" + onQuestionNum + " answered correctly!");
        } else {
            var timeToSubtract = questionDifficulty.indexOf(questionObj.results[onQuestionNum].difficulty);
            timeToSubtract = Math.abs(timeToSubtract - 3)

            // Check if the timeToSubtract is greater than timeLeft. If it is then set timeLeft to 0 and end the game
            if (timeLeft <= timeToSubtract) {
                timeLeft = 0;
                gameOver();
            } else {
                timeLeft -= timeToSubtract;
            }

            // The user answered the question incorrectly so do the proper logic here
            console.log("Question #" + onQuestionNum + " answered incorrectly!");
        }

        onQuestionNum += 1;
        populateAnswerButtons();
    } else {
        gameOver();
    }

}


function gameOver() {
    timerRunning = false;
    var onQuestionNumPlusOne = onQuestionNum + 1;
    alert("You got a score of: " + score + "! In a total of " + onQuestionNumPlusOne + " questions!")
    showElem(question_block, false);
    showElem(form_block, true)
}

function setLocalStorage(key, value) {
    var temp = getLocalStorage(key);
    // If there is already a saved key by the same name then append to the current key
    if (temp !== null) {
        temp.push(value);
        window.localStorage.setItem("data", JSON.stringify(temp));
    } else {
        var data = [value]
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}

function getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function clearLocalStorage() {
    window.localStorage.clear();
    location.reload();
}

clearScoresBtn.addEventListener("click", clearLocalStorage)


function recordScore() {
    event.preventDefault();

    var initials = document.getElementById("initials").value;

    var tempData = {
        "initials": initials,
        "score": score,
    }

    setLocalStorage("data", tempData);
    showElem(form_block, false);
    showElem(menu_block, true);
    showScores();
}

submitBtn.addEventListener("click", recordScore);


function showScores() {
    var data = getLocalStorage("data");
    if (data !== null) {
        for (var i = 0; i < data.length; i++) {
            var pElem = document.createElement("p");

            pElem.textContent = data[i].initials + ": " + data[i].score;
            previousScoresElem.appendChild(pElem);
        }
    }
}