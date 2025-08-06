document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        wordDisplay: document.querySelector(".word-display"),
        keyboard: document.querySelector(".keyboard"),
        hangmanParts: document.querySelectorAll(".hangman-part"),
        incorrectGuessesText: document.querySelector(".incorrect-guesses span"),
        gameModal: document.getElementById("game-modal"),
        modalImage: document.querySelector(".modal-content img"),
        modalTitle: document.querySelector(".modal-title"),
        modalWord: document.querySelector(".modal-word"),
        playAgainBtn: document.querySelector(".play-again-btn"),
        hintButton: document.getElementById("hint-button"),
        difficultySelect: document.getElementById("difficulty"),
        winsCount: document.getElementById("wins-count"),
        lossesCount: document.getElementById("losses-count"),
        highscoreCount: document.getElementById("highscore-count"),
        themeToggle: document.getElementById("theme-toggle")
    };

    // Game State
    const gameState = {
        currentWord: "",
        correctLetters: [],
        incorrectGuessCount: 0,
        maxGuesses: 6,
        wordList: [],
        wins: 0,
        losses: 0,
        highScore: parseInt(localStorage.getItem('hangmanHighScore')) || 0,
        difficulty: 'medium'
    };

    // --- INITIALIZATION ---

    const init = async () => {
        await fetchWordList();
        setupEventListeners();
        createKeyboard();
        loadTheme();
        updateScoreboard();
        startNewGame();
    };

    const fetchWordList = async () => {
        try {
            const response = await fetch('wordlist.txt');
            if (!response.ok) throw new Error('Network response was not ok');
            const text = await response.text();
            // Clean up the list: remove quotes, trim whitespace, filter empty lines
            gameState.wordList = text.split('\n')
                .map(word => word.trim().replace(/"/g, ''))
                .filter(word => /^[a-zA-Z]+$/.test(word) && word.length > 0);
            if (gameState.wordList.length === 0) throw new Error('Word list is empty or invalid.');
        } catch (error) {
            console.error("Fatal Error: Could not load word list.", error);
            elements.modalTitle.innerText = "Error";
            elements.modalText.innerText = "Could not load the word list. Please check the `wordlist.txt` file and refresh.";
            elements.gameModal.classList.add("show");
        }
    };

    const createKeyboard = () => {
        elements.keyboard.innerHTML = ''; // Clear previous keyboard
        for (let i = 97; i <= 122; i++) {
            const button = document.createElement("button");
            const letter = String.fromCharCode(i);
            button.innerText = letter;
            button.setAttribute('data-letter', letter);
            elements.keyboard.appendChild(button);
        }
    };

    const setupEventListeners = () => {
        elements.playAgainBtn.addEventListener("click", startNewGame);
        elements.difficultySelect.addEventListener("change", (e) => {
            gameState.difficulty = e.target.value;
            startNewGame();
        });
        elements.hintButton.addEventListener("click", provideHint);
        elements.themeToggle.addEventListener("change", toggleTheme);

        // Keyboard event listeners
        elements.keyboard.addEventListener("click", (e) => {
            if (e.target.tagName === 'BUTTON') {
                handleGuess(e.target.dataset.letter, e.target);
            }
        });
        document.addEventListener("keydown", (e) => {
            const letter = e.key.toLowerCase();
            if (letter.match(/^[a-z]$/) && !elements.gameModal.classList.contains("show")) {
                const button = elements.keyboard.querySelector(`[data-letter='${letter}']`);
                if (button && !button.disabled) {
                    handleGuess(letter, button);
                }
            }
        });
    };

    // --- GAME LOGIC ---

    const startNewGame = () => {
        gameState.correctLetters = [];
        gameState.incorrectGuessCount = 0;
        selectRandomWord();
        resetUI();
    };

    const selectRandomWord = () => {
        const difficultySettings = {
            easy: { min: 4, max: 6 },
            medium: { min: 7, max: 10 },
            hard: { min: 11, max: 99 }
        };
        const { min, max } = difficultySettings[gameState.difficulty];
        const filteredWords = gameState.wordList.filter(word => word.length >= min && word.length <= max);
        
        if (filteredWords.length === 0) {
            alert(`No words found for the '${gameState.difficulty}' difficulty. Please check your wordlist.txt.`);
            gameState.currentWord = 'default'; // Fallback
            return;
        }

        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        gameState.currentWord = filteredWords[randomIndex].toLowerCase();
        console.log("Selected Word:", gameState.currentWord); // For debugging
    };
    
    const handleGuess = (letter, button) => {
        if (!letter || !button) return;

        button.disabled = true;

        if (gameState.currentWord.includes(letter)) {
            // Correct guess
            button.classList.add('correct');
            [...gameState.currentWord].forEach((char, index) => {
                if (char === letter) {
                    gameState.correctLetters.push(letter);
                    const letterElement = elements.wordDisplay.querySelectorAll("li")[index];
                    letterElement.innerText = letter;
                    letterElement.classList.add("guessed");
                }
            });
        } else {
            // Incorrect guess
            button.classList.add('incorrect');
            gameState.incorrectGuessCount++;
            elements.wordDisplay.classList.add('shake');
            setTimeout(() => elements.wordDisplay.classList.remove('shake'), 500);
        }
        
        updateGameUI();
        checkGameState();
    };

    const provideHint = () => {
        const unguessedLetters = [...gameState.currentWord].filter(
            letter => !gameState.correctLetters.includes(letter)
        );

        if (unguessedLetters.length > 0) {
            const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
            const button = elements.keyboard.querySelector(`[data-letter='${hintLetter}']`);
            if(button) {
                handleGuess(hintLetter, button);
                // Hint penalty: counts as one wrong guess
                gameState.incorrectGuessCount++;
                updateGameUI();
                checkGameState();
            }
        }
    };

    const checkGameState = () => {
        if (gameState.incorrectGuessCount >= gameState.maxGuesses) {
            endGame(false);
        } else if (gameState.correctLetters.length === gameState.currentWord.length) {
            endGame(true);
        }
    };

    const endGame = (isVictory) => {
        setTimeout(() => {
            if (isVictory) {
                gameState.wins++;
                elements.modalTitle.innerText = "Congratulations!";
                elements.modalImage.src = 'images/victory.gif';
                elements.modalWord.parentElement.style.display = 'none';
                if (gameState.wins > gameState.highScore) {
                    gameState.highScore = gameState.wins;
                    localStorage.setItem('hangmanHighScore', gameState.highScore);
                }
            } else {
                gameState.losses++;
                elements.modalTitle.innerText = "Game Over!";
                elements.modalImage.src = 'images/lost.gif';
                elements.modalWord.parentElement.style.display = 'block';
                elements.modalWord.innerText = gameState.currentWord;
            }
            updateScoreboard();
            elements.gameModal.classList.add("show");
            elements.gameModal.setAttribute('aria-hidden', 'false');
        }, 500);
    };

    // --- UI UPDATES ---

    const resetUI = () => {
        // Reset word display
        elements.wordDisplay.innerHTML = gameState.currentWord.split("").map(() => `<li class="letter"></li>`).join("");

        // Reset keyboard
        elements.keyboard.querySelectorAll("button").forEach(btn => {
            btn.disabled = false;
            btn.className = '';
        });

        // Hide modal
        elements.gameModal.classList.remove("show");
        elements.gameModal.setAttribute('aria-hidden', 'true');
        
        updateGameUI();
    };

    const updateGameUI = () => {
        // Update incorrect guess count and hangman figure
        elements.incorrectGuessesText.innerText = `${gameState.incorrectGuessCount} / ${gameState.maxGuesses}`;
        elements.hangmanParts.forEach((part, index) => {
            part.style.display = index < gameState.incorrectGuessCount ? 'block' : 'none';
        });

        // Disable hint button if not enough guesses left or word is almost solved
        const remainingGuesses = gameState.maxGuesses - gameState.incorrectGuessCount;
        const unguessedLetters = gameState.currentWord.length - gameState.correctLetters.length;
        elements.hintButton.disabled = remainingGuesses <= 1 || unguessedLetters <= 1;
    };
    
    const updateScoreboard = () => {
        elements.winsCount.innerText = gameState.wins;
        elements.lossesCount.innerText = gameState.losses;
        elements.highscoreCount.innerText = gameState.highScore;
    };

    // --- THEME MANAGEMENT ---

    const toggleTheme = () => {
        const isChecked = elements.themeToggle.checked;
        if(isChecked) {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('hangmanTheme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('hangmanTheme', 'dark');
        }
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('hangmanTheme');
        if(savedTheme === 'light') {
            elements.themeToggle.checked = true;
            document.body.classList.replace('dark-theme', 'light-theme');
        }
    };

    // Start the application
    init();
});