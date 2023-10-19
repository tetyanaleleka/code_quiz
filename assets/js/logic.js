//variable to keep track of quiz state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;

// HTML elements;
let questionsElement = document.getElementById("questions");
let timerElement = document.getElementById("time");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getAnimations("initials");
let feedBackElement = document.getElementById("feedback");


let sfxRight = new Audio("assets/sfx/correct.wav");



function getQuestion(){

}

function questionClick(){

}

function startQuiz(){
    alert("Hi")
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

