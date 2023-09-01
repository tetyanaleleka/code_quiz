// varianle to keep track of quiz state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;


// HTML elements;
let questionsElement = document.getElementById("guestions");
let timerElement = document.getElementById("time");
let choiceElement = document.getElementById("choice");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackElement = document.getElementById("feedback");


let sfxRight = new Audio("assets/sfx/correct.wav");



function getQuestion(){

}

function questionClick(){

}


function startQuiz(){
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");


    questionsElement.removeAttribute("class");


    timeID = setInterval(clockTick, 1000)
}

function quizEnd(){

}

function clockTick(){

}

function saveHighScore(){

}

function checkForEnter(event){

}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);


