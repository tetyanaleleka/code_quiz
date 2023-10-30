function printHighScores() { // declaring a function named printHighScores.
    let highScores = JSON.parse(localStorage.getItem("highscores")) || []; // retrieving the high scores stored in the web browser's local storage. 
    // fetching the value associated with the key "highscores" from local storage. If there are no high scores stored, it assigns an empty array [] as a default value

    highScores.sort(function (a, b) {
        return b.score - a.score;
    });// sorting the highScores array in descending order based on the score property of each score object. This sorts the high scores from highest to lowest.

    let ol = document.getElementById("highscores"); // selects an HTML id "highscores" and stores it in the variable ol. 
    ol.innerHTML = ""; // clears the previous content of the ordered list (<ol>) by setting its innerHTML to an empty string. This is done to remove any previously displayed high scores before updating with the new sorted list.

    highScores.forEach(function (score) {// starts a loop that iterates over each score
        let li = document.createElement("li"); // Inside the loop, it creates a new list item (<li>) element for each high score.
        li.textContent = `${score.initials} - ${score.score}`; // setting the text content of the newly created list item to a string that combines the user's initials and their score e.g JR - 200, means JR scored 200

        ol.appendChild(li); // appending the created list item (<li>) to the ordered list (<ol>). This adds each high score to the list for display.
    });
}

function clearHighScores() { // claering the "highscores" item from the web browser's local storage, effectively clearing all stored high scores.
    localStorage.removeItem("highscores");
    window.location.reload(); // After removing the high scores, reloads the current web page. This will clear the displayed high scores and reset the page to its initial state.
}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighScores); // When the button is clicked, it calls the clearHighScores function, which removes the high scores and reloads the page.

// Call the printHighScores function to display scores to ensures that high scores are displayed when the page loads
printHighScores();