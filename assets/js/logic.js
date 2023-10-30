let currentQuestionIndex = 0;// This line declares a variable called currentQuestionIndex and initialises it to 0. This variable will keep track of the index of the current question being displayed.
let time = questions.length * 15;
// calculating the total time for the quiz by multiplying the number of questions in the questions array by 15 seconds. This variable is used to display the remaining time during the quiz.
let timerID;// Storing the ID of the interval timer that counts down the time.


// declaring and assigning a reference to HTML element with IDs
let questionsElement = document.getElementById("questions"); // display the current question during the quiz
let timerElement = document.getElementById("time"); // display the remaining time
let choicesElement = document.getElementById("choices"); // the container where the answer choices for the current question will be displayed
let submitButton = document.getElementById("submit"); // submit button for answers
let startButton = document.getElementById("start"); // button to start quiz
let initialsElement = document.getElementById("initials"); // the user's initials input when submitting score.
let feedbackElement = document.getElementById("feedback"); // display feedback messages, such as "Correct!" or "Wrong."
let sfxRight = new Audio("assets/sfx/correct.wav"); // playing sounds in response to correct answers.
let sfxWrong = new Audio("assets/sfx/incorrect.wav"); // playing sounds in response to wrong answers.


function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex]; // This line retrieves the current question object from the questions array based on the currentQuestionIndex. It assigns this question object to the variable currentQuestion

    let titleElement = document.getElementById("question-title");
    titleElement.textContent = currentQuestion.title;
    // HTML element with the ID "question-title" and set its textContent to the title of the current question. This updates the question displayed on the webpage.

    choicesElement.innerHTML = ""; // This line clears the previous choices by setting the innerHTML of the choicesElement (usually a container for answer choices) to an empty string.

    currentQuestion.choices.forEach(function (choice, index) {
        let choiceButton = document.createElement("button"); // Creating a new <button> element to represent the answer choice.

        choiceButton.setAttribute("class", "choice"); // Setting the class attribute of the button to "choice."
        choiceButton.setAttribute("value", choice); // Setting the value attribute of the button to the text of the answer choice.

        choiceButton.textContent = `${index + 1}. ${choice}`; // Setting the text content of the button to display the choice with an index (e.g., "1. Choice 1")
        choiceButton.classList.add("choice"); // Adding the "choice" class to the button.

        choiceButton.addEventListener("click", questionClick); // Attaching a click event listener to the button, so when it's clicked, it calls the questionClick function.

        choicesElement.appendChild(choiceButton); // Appending the button to the choicesElement
    });

}


function questionClick() {
    let selectedAnswer = this.value; // capturing the selected answer when a choice button is clicked
    questions[currentQuestionIndex].userAnswer = selectedAnswer; // assigning the selected answer to the selectedAnswer variable and updating the userAnswer property of the current question in the questions array with the selected answe

    // checking if the selected answer is not equal to the correct answer for the current question. If it's incorrect then below happens
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0
        }// Decreasing the time variable by 15 seconds (for time penalty) 

        timerElement.textContent = time;   // Updates the displayed time on the webpage
        feedbackElement.textContent = "Wrong"; // Displays "Wrong" in the feedback element.
        sfxWrong.play(); // Plays an incorrect sound.

        // If the selected answer is correct:
    } else {
        sfxRight.play(); // Plays a correct sound.
        feedbackElement.textContent = "Correct!"; // Displays "Correct!" in the feedback element.
        time += 15; // Add 15 seconds for a correct answer
        timerElement.textContent = time;

    }
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackElement.setAttribute("class", "feedback hide")
    }, 1000); // adds the "feedback" class to show it, then uses a timeout to remove the "feedback" class after 1000 milliseconds, effectively hiding it.

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    } // incrementing the currentQuestionIndex to move to the next question. If there are no more questions, it calls quizEnd(). Otherwise, it calls getQuestion() to display the next question.

}

// calculating the number of correct answers. 
function calculateCorrectAnswers() {
    let correctAnswers = 0; // initialising correctAnswers to 0 and then loops through each question

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer === questions[i].answer) {
            correctAnswers++;
        }
    }
    return correctAnswers; // If the user's answer (userAnswer) for a question matches the correct answer (answer), it increments correctAnswers. Finally, it returns the total count of correct answers.
}

function quizEnd() {
    clearInterval(timerID);
    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");
    let finalScoreElement = document.getElementById("final-score");

    let correctAnswers = calculateCorrectAnswers(); // Use the calculateCorrectAnswers function
    let score = time; // computing the score the remaining time

    finalScoreElement.textContent = score; // HTML element with the ID "final-score" to display the calculated score

    questionsElement.setAttribute("class", "hide");
}

// time 
function clockTick() {
    time--; // decrements the time variable by 1 second on each clock tick.
    timerElement.textContent = time; // updates the displayed time on the webpage

    if (time <= 0) {
        quizEnd();
    } // checks if the time has run out (less than or equal to 0) and, if so, calls the quizEnd() function to end the quiz.
}


// Function to start the quiz
function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide"); // HTML element with the ID "start-screen" and assigns it to the startScreenElement variable.
    // setting the class attribute of this element to "hide," effectively hiding the start screen. This is done to transition from the start screen to the quiz questions.

    questionsElement.removeAttribute("class"); // removing the class attribute from the questionsElement, effectively displaying the quiz questions on the webpage.
    timerID = setInterval(clockTick, 1000); //  setting up an interval using the setInterval function. calling the clockTick function every 1000 milliseconds, which updates the countdown timer.
    timerElement.textContent = time; // setting the initial value of the countdown timer element on the webpage to the time variable's value. This initialises the timer with the full time available for the quiz.
    getQuestion(); // calling the getQuestion() function to display the first question of the quiz.
}

function saveHighScore() {
    let initials = initialsElement.value.trim(); // getting the value of the input element with the ID "initials" and trims any leading or trailing whitespace. This ensures that there are no unnecessary spaces in the initials

    if (initials !== "") { // verifies that the user has entered some initials.
        let highScores = JSON.parse(localStorage.getItem("highscores")) || []; // retrieves the high scores from the local storage
        let correctAnswers = calculateCorrectAnswers();
        let score = time; // Calculate the score
        let newScore = {
            score: score,
            initials: initials
        } // a new score object is created with two properties: score + the remaining time and initials (the user's initials).
        highScores.push(newScore); // new score is added to the highScores array.
        localStorage.setItem("highscores", JSON.stringify(highScores));
        // updated highScores array is stored back in local storage after converting it to a JSON string using JSON.stringify.

        window.location.href = "highscores.html"; // browser is redirected to the "highscores.html" page, where the high scores will be displayed.
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") { //  input field where the user enters their initials/ checks if the key that triggered the event is the "Enter" key
        saveHighScore(); // If the "Enter" key is pressed, it calls the saveHighScore() function, effectively saving the user's high score.
    }

}

// These functions and event listeners work together to control the flow of the quiz, handle user input, and save high scores.

// When the "Start Quiz" button is clicked (startButton), it triggers the startQuiz() function.
startButton.addEventListener("click", startQuiz);

// When the "Submit" button is clicked (submitButton), it triggers the saveHighScore() function.
submitButton.addEventListener("click", saveHighScore);

// When a key is released in the initialsElement input field, it triggers the checkForEnter() function, which checks if the "Enter" key was pressed and, if so, saves the high score
initialsElement.addEventListener("keyup", checkForEnter);