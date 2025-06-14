const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuess;
const maxGuesses = 6;

// Resetting all game variables and UI elements
const resetGame = () => {
    correctLetters = [];
    wrongGuess = 0;
    hangmanImage.src = `assets/hangman-${wrongGuess}.svg`;
    guessesText.innerText = `${wrongGuess} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
    gameModal.classList.remove("show");
};

// Selecting a random word and hint from wordList
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase();
    console.log("Selected word:", word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

// Game over function
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You Found The Word:` : `The Correct Word Was:`;
        gameModal.querySelector("img").src = `assets/${isVictory ? "victory" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? "Congrats!" : "Game Over!";
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
};

// Handling letter click
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });

        if (!correctLetters.includes(clickedLetter)) {
            correctLetters.push(clickedLetter);
        }
    } else {
        wrongGuess++;
        hangmanImage.src = `assets/hangman-${wrongGuess}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuess} / ${maxGuesses}`;

    const uniqueLetters = [...new Set(currentWord.split(""))];
    if (wrongGuess === maxGuesses) return gameOver(false);
    if (correctLetters.length === uniqueLetters.length) return gameOver(true);
};

// Creating A-Z keyboard
const createKeyboard = () => {
    keyboardDiv.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        button.addEventListener("click", (e) => initGame(e.target, button.innerText));
    }
};

createKeyboard();
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
