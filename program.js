const levels = [
    { word: "apple", hint: "A fruit" },
    { word: "banana", hint: "Another fruit" },
    { word: "carrot", hint: "A vegetable" }
];

const wordContainer = document.getElementById("word-container");
const levelDisplay = document.getElementById("level");
const hintDisplay = document.getElementById("hint");
const messageDisplay = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const wordDisplay = document.getElementById("word-display");
const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-button");

let currentLevel = 0;
let attempts = 0;
const maxAttempts = 6;

function updateLevel() {
    levelDisplay.textContent = `Level ${currentLevel + 1}`;
    hintDisplay.textContent = `Hint: ${levels[currentLevel].hint}`;
}

function updateWordDisplay() {
    wordDisplay.textContent = levels[currentLevel].word
        .split("")
        .map(letter => (guessedWord.includes(letter) ? letter : "_"))
        .join(" ");
}

function checkGuess() {
    const letter = userInput.value.toLowerCase();
    if (letter.length !== 1 || !/^[a-z]$/.test(letter)) {
        messageDisplay.textContent = "Please enter a single letter.";
        return;
    }

    if (levels[currentLevel].word.includes(letter)) {
        for (let i = 0; i < levels[currentLevel].word.length; i++) {
            if (levels[currentLevel].word[i] === letter) {
                guessedWord[i] = letter;
            }
        }

        updateWordDisplay();

        if (!guessedWord.includes("_")) {
            messageDisplay.textContent = "Congratulations! You guessed the word.";
            checkButton.disabled = true;
            currentLevel++;
            if (currentLevel < levels.length) {
                setTimeout(() => {
                    messageDisplay.textContent = "Moving to the next level...";
                    setTimeout(startNextLevel, 2000);
                }, 2000);
            } else {
                messageDisplay.textContent = "You completed all levels!";
            }
        }
    } else {
        attempts++;
        attemptsDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;
        if (attempts >= maxAttempts) {
            messageDisplay.textContent = `Game Over! The word was ${levels[currentLevel].word}`;
            checkButton.disabled = true;
        }
    }

    userInput.value = "";
    userInput.focus();
}

function startNextLevel() {
    guessedWord = Array(levels[currentLevel].word.length).fill("_");
    updateWordDisplay();
    checkButton.disabled = false;
    messageDisplay.textContent = "";
    attempts = 0;
    attemptsDisplay.textContent = `Attempts left: ${maxAttempts}`;
    updateLevel();
}

checkButton.addEventListener("click", checkGuess);
updateLevel();
startNextLevel();
