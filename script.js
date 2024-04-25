document.addEventListener('DOMContentLoaded', function () {
    const words = ['hangman', 'javascript', 'programming', 'developer', 'computer', 'algorithm'];
    let chosenWord = words[Math.floor(Math.random() * words.length)];
    let guessedLetters = new Set();
    let remainingGuesses = 6;

    const wordContainer = document.getElementById('word-container');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const hangmanContainer = document.getElementById('hangman');
    const status = document.getElementById("status");
    const restartButton = document.getElementById('restart-button');

    function displayWord() {
        wordContainer.innerHTML = chosenWord.split('').map(letter => {
            if (guessedLetters.has(letter)) {
                return letter;
            } else {
                return '_';
            }
        }).join(' ');
    }

    function displayHangman() {
        const parts = 6 - remainingGuesses;
        hangmanContainer.innerHTML = `
            <div class="head ${parts >= 1 ? 'visible' : ''}"></div>
            <div class="body ${parts >= 2 ? 'visible' : ''}"></div>
            <div class="left-arm ${parts >= 3 ? 'visible' : ''}"></div>
            <div class="right-arm ${parts >= 4 ? 'visible' : ''}"></div>
            <div class="left-leg ${parts >= 5 ? 'visible' : ''}"></div>
            <div class="right-leg ${parts >= 6 ? 'visible' : ''}"></div>
        `;
    }

    function checkWin() {
        if (chosenWord.split('').every(letter => guessedLetters.has(letter))){
        status.textContent = 'Congratulations! You Win!';
        guessInput.disabled = true;
        guessButton.disabled = true;
        }
    }
    function checkLose() {
        if (remainingGuesses === 0) {
          status.textContent = `You lose! The word was "${chosenWord}".`;
          guessInput.disabled = true;
          guessButton.disabled = true;
        }
      }
    
      function resetGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters.clear();
        remainingGuesses = 6;
        displayWord();
        displayHangman();
        status.textContent = '';
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.disabled = false;
      }
    
      displayWord();
      displayHangman();
    
      guessButton.addEventListener('click', function () {
        const guess = guessInput.value.toLowerCase();
        if (guess && !guessedLetters.has(guess)) {
          guessedLetters.add(guess);
          if (!chosenWord.includes(guess)) {
            remainingGuesses--;
          }
          displayWord();
          displayHangman();
          checkWin();
          checkLose();
        }
        guessInput.value = '';
      });
    
      restartButton.addEventListener('click', resetGame);

})