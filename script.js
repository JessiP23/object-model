document.addEventListener('DOMContentLoaded', function () {
    const words = ['hangman', 'javascript', 'programming', 'developer', 'computer', 'algorithm'];
    let chosenWord = words[Math.floor(Math.random() * words.length)];
    let guessedLetters = new Set();
    let remainingGuesses = 6;

    const wordContainer = document.getElementById('word-container');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const status = document.getElementById("status");
    const restartButton = document.getElementById('restart-button');

    function displayWord() {
        wordContainer.textContent = chosenWord.split('').map(letter => {
            return guessedLetters.has(letter) ? letter : '_';
        }).join(' ');
    }

    function checkWin() {
        if (chosenWord.split('').every(letter => guessedLetters.has(letter))){
            status.textContent = 'Congratulations! You Win!';
            disableInput();
        }
    }

    function checkLose() {
        if (remainingGuesses === 0) {
            status.textContent = `You lose! The word was "${chosenWord}".`;
            disableInput();
        }
    }

    function disableInput() {
        guessInput.disabled = true;
        guessButton.disabled = true;
    }

    function resetGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters.clear();
        remainingGuesses = 6;
        displayWord();
        status.textContent = '';
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.disabled = false;
    }

    displayWord();

    guessButton.addEventListener('click', function () {
        const guess = guessInput.value.toLowerCase();
        if (!guess || guessedLetters.has(guess)) return;
        guessedLetters.add(guess);
        if (!chosenWord.includes(guess)) remainingGuesses--;
        displayWord();
        checkWin();
        checkLose();
        guessInput.value = '';
    });

    restartButton.addEventListener('click', resetGame);
});
