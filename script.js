var onQuestionNum = 0; // Increment this every time a question is answered
var score = 0;
var questionDifficulty = ["easy", "medium", "hard"];
var questionCount = 10
var hideItems = document.getElementsByClassName("hideMe");

var minutes = 3;
var totalSeconds = 60 * minutes;
var timeLeft = totalSeconds;
var timerElem = document.getElementById("timer");


var questionJsonObj = {
    "results": [{
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
        "correct_answer": "1000",
        "incorrect_answers": ["512", "1024", "500"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What does AD stand for in relation to Windows Operating Systems? ",
        "correct_answer": "Active Directory",
        "incorrect_answers": ["Alternative Drive", "Automated Database", "Active Department"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "The programming language &#039;Swift&#039; was created to replace what other programming language?",
        "correct_answer": "Objective-C",
        "incorrect_answers": ["C#", "Ruby", "C++"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What was the name given to Android 4.3?",
        "correct_answer": "Jelly Bean",
        "incorrect_answers": ["Lollipop", "Nutella", "Froyo"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "In web design, what does CSS stand for?",
        "correct_answer": "Cascading Style Sheet",
        "incorrect_answers": ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "While Apple was formed in California, in which western state was Microsoft founded?",
        "correct_answer": "New Mexico",
        "incorrect_answers": ["Washington", "Colorado", "Arizona"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Which one of these is not an official development name for a Ubuntu release?",
        "correct_answer": "Mystic Mansion",
        "incorrect_answers": ["Trusty Tahr", "Utopic Unicorn", "Wily Werewolf"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Which of these was the name of a bug found in April 2014 in the publicly available OpenSSL cryptography library?",
        "correct_answer": "Heartbleed",
        "incorrect_answers": ["Shellshock", "Corrupted Blood", "Shellscript"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What is the correct term for the metal object in between the CPU and the CPU fan within a computer system?",
        "correct_answer": "Heat Sink",
        "incorrect_answers": ["CPU Vent", "Temperature Decipator", "Heat Vent"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "What does LTS stand for in the software market?",
        "correct_answer": "Long Term Support",
        "incorrect_answers": ["Long Taco Service", "Ludicrous Transfer Speed", "Ludicrous Turbo Speed"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Who is the original author of the realtime physics engine called PhysX?",
        "correct_answer": "NovodeX",
        "incorrect_answers": ["Ageia", "Nvidia", "AMD"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "What is the name of the process that sends one qubit of information using two bits of classical information?",
        "correct_answer": "Quantum Teleportation",
        "incorrect_answers": ["Super Dense Coding", "Quantum Entanglement", "Quantum Programming"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What is the main CPU is the Sega Mega Drive \/ Sega Genesis?",
        "correct_answer": "Motorola 68000",
        "incorrect_answers": ["Zilog Z80", "Yamaha YM2612", "Intel 8088"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "What does the International System of Quantities refer 1024 bytes as?",
        "correct_answer": "Kibibyte",
        "incorrect_answers": ["Kylobyte", "Kilobyte", "Kelobyte"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "What vulnerability ranked #1 on the OWASP Top 10 in 2013?",
        "correct_answer": "Injection ",
        "incorrect_answers": ["Broken Authentication", "Cross-Site Scripting", "Insecure Direct Object References"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Who invented the &quot;Spanning Tree Protocol&quot;?",
        "correct_answer": "Radia Perlman",
        "incorrect_answers": ["Paul Vixie", "Vint Cerf", "Michael Roberts"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which programming language shares its name with an island in Indonesia?",
        "correct_answer": "Java",
        "incorrect_answers": ["Python", "C", "Jakarta"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "In computing, what does MIDI stand for?",
        "correct_answer": "Musical Instrument Digital Interface",
        "incorrect_answers": ["Musical Interface of Digital Instruments", "Modular Interface of Digital Instruments", "Musical Instrument Data Interface"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Which of these is not a layer in the OSI model for data communications?",
        "correct_answer": "Connection Layer",
        "incorrect_answers": ["Application Layer", "Transport Layer", "Physical Layer"]
    }, {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "The teapot often seen in many 3D modeling applications is called what?",
        "correct_answer": "Utah Teapot",
        "incorrect_answers": ["Pixar Teapot", "3D Teapot", "Tennessee Teapot"]
    }]
}

// Dynamic Version
// function beginGame() {
//     $.getJSON('https://opentdb.com/api.php?amount=' + questionCount + '&category=18&type=multiple', function (data) {
//         // JSON result in `data` variable
//         if (data.response_code === 0) {
//             console.log("Got response!")
//             questionJsonObj = data.results;

//             for (var i = 0; i < hideItems.length; i++) {
//                 hideItems[i].style.display = "none";
//             }

//             var display = document.querySelector('#time');
//             startTimer(totalSeconds, display);

//             populateHtmlWithQuestion();
//         } else {
//             alert("Error getting question data from API!")
//         }
//     });

// }

// Static Version

function beginGame() {
    questionJsonObj = questionJsonObj.results;

    score = 0;
    onQuestionNum = 0;

    for (var i = 0; i < hideItems.length; i++) {
        hideItems[i].style.display = "none";
    }

    var display = document.querySelector('#time');
    startTimer(totalSeconds, display);

    populateHtmlWithQuestion();

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


function timer(startStop) {

}


var intervalFunc = setInterval(timer, 1000);


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
        clearInterval(intervalFunc);
        alert("You got a score of: " + score + "! In a total of " + questionCount + " questions!")

        for (var i = 0; i < hideItems.length; i++) {
            hideItems[i].style.display = "block";
        }
    }

}