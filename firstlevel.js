document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetBtn = document.querySelector('.reset-btn');
    const timerDisplay = document.getElementById('timer');

    // Get player letters from URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const player1Letter = params.player1 || '0';
    const player2Letter = params.player2 || '1';

    // Set initial currentPlayer based on player1Letter
    let currentPlayer = player1Letter;
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let secondsElapsed = 0;
    let timerInterval;

    // Function to handle cell click
    function handleCellClick(index) {
        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            renderBoard();
            checkWinner();
            togglePlayer();
        }
    }

    // Function to render the board
    function renderBoard() {
        board.innerHTML = '';
        boardState.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cell);
        });
    }

    // Function to toggle player
    function togglePlayer() {
        currentPlayer = currentPlayer === player1Letter ? player2Letter : player1Letter;
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                result.textContent = `${currentPlayer} Win Congratulation.....!`;
                result.style.display = 'block'; // Show result
                clearInterval(timerInterval);
            }
        }

        if (!boardState.includes('') && gameActive) {
            gameActive = false;
            result.textContent = 'Sorry It\'s a draw Match...!';
            result.style.display = 'block'; // Show result
            clearInterval(timerInterval);
        }
    }

    // Function to update and display the timer
    function updateTimer() {
        timerDisplay.textContent = `Time: ${secondsElapsed}s`; // Update timer every 1 second

        if (secondsElapsed >= 30) {
            gameActive = false;
            result.textContent = 'Oops Time Up!';
            result.style.display = 'block'; // Show result
            clearInterval(timerInterval);
        } else {
            secondsElapsed++;
        }
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = player1Letter;
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        result.textContent = '';
        result.style.display = 'none'; // Hide result
        renderBoard();
        secondsElapsed = 0;
        timerDisplay.textContent = 'Time: 0s'; // Reset timer display
        clearInterval(timerInterval); // Clear the existing interval
        timerInterval = setInterval(updateTimer, 1000); // Update timer every 1 second
    }

    // Add event listener for the reset button
    resetBtn.addEventListener('click', resetGame);

    // Initial rendering of the board
    renderBoard();
    resetGame(); // Start the game and timer

    // Start playing the background music when the user interacts with the page
 

    // Toggle background music on/off
    const musicToggleButton = document.getElementById('musicToggleButton');
    musicToggleButton.addEventListener('click', toggleBackgroundMusic);
   

    function toggleBackgroundMusic() {
        const backgroundMusic = document.getElementById('backgroundMusic');
        const musicToggleButton = document.getElementById('musicToggleButton');
       
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleButton.innerText = 'Sound On';
        } else {
            backgroundMusic.pause();
            musicToggleButton.innerText = 'Sound Off';
        }
    }
   
});  
