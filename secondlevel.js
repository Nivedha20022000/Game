document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const wordText = document.querySelector(".word");
    const hintText = document.querySelector(".hint span");
    const timeText = document.querySelector(".time b");
    const inputField = document.querySelector(".input-field");
    const refreshBtn = document.querySelector(".refresh-word");
    const checkBtn = document.querySelector(".check-word");
    const popup = document.getElementById('popup');
    const audioToggle = document.getElementById('audio-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const levelCompletedPopup = document.getElementById('level-completed-popup');
    const scoreDisplay = document.createElement('div');
   
    let correctWord, timer, currentWord, completedWords = 0, incompleteWords = 0, gameCompleted = false;
    const words = [
      {
        word: "algorithm",
        hint: "Step-by-step procedure for solving"
      },
      {
        word: "authentication",
        hint: "Verification of identity for access"
      },
      {
        word: "cybersecurity",
        hint: "Protection of systems from threats"
      },
      {
        word: "denialofservice",
        hint: "Cyberattack making resources unavailable intentionally"
      },
      {
        word: "encryption",
        hint: "Process of encoding information securely"
      },
      {
        word: "firewall",
        hint: "Network security device for protection"
      },
      {
        word: "malware",
        hint: "Software intended for malicious purposes"
      },
      {
        word: "phishing",
        hint: "Attempt to obtain sensitive information"
      },
      {
        word: "rootkit",
        hint: "Malicious software for unauthorized access"
      },
      {
        word: "virtualization",
        hint: "Creation of virtual versions efficiently"
      }
      // Add more words and hints here
    ];
  
    const initTimer = maxTime => {
      clearInterval(timer);
      timeText.innerText = 0; // Set initial time to 0
      let currentTime = 0; // Initialize current time
      timer = setInterval(() => {
        if (currentTime < maxTime) { // Check if current time is less than maxTime
          currentTime++; // Increment current time
          timeText.innerText = currentTime; // Update time text
          return;
        }
        clearInterval(timer);
        displayPopup(`Time's up!`);
        setTimeout(() => {
          closePopup();
          initGame();
        }, 3000);
      }, 3000);
    };
  
    const initGame = () => {
      if (words.length === 0) {
        displayLevelCompleted();
        return;
      }
  
      currentWord = words.shift();
  
      correctWord = currentWord.word.toLowerCase();
      const scrambledWord = scrambleWord(correctWord);
      wordText.textContent = scrambledWord;
      hintText.textContent = currentWord.hint;
      inputField.value = "";
      wordText.style.display = "block"; // Ensure word text is displayed
      document.querySelector('.details').style.display = "block"; // Ensure details section is displayed
      inputField.disabled = false; // Enable input field
      document.querySelector('.buttons').style.display = "flex"; // Ensure buttons section is displayed
      refreshBtn.disabled = false; // Enable refresh button
      checkBtn.disabled = false; // Enable check button
      initTimer(30);
    };
  
    const scrambleWord = word => {
      const wordArray = word.split('');
      for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
      }
      return wordArray.join('');
    };
  
    const checkWord = () => {
      const userWord = inputField.value.trim().toLowerCase();
      if (!userWord) return alert("Please enter a word to check!");
      if (userWord !== correctWord) {
        incompleteWords++;
        displayPopup(`Oops! ${userWord} is not correct.`);
      } else {
        completedWords++;
        displayPopup(`Congratulations! ${correctWord.toUpperCase()} is correct!`);
      }
      // Move to the next word after displaying the message
      setTimeout(initGame, 2000);
    };
  
    refreshBtn.addEventListener("click", initGame);
    checkBtn.addEventListener("click", checkWord);
   
    function displayPopup(message) {
      const popupMessage = document.querySelector('.popup-message');
      popupMessage.textContent = message;
      popup.style.display = 'block';
      setTimeout(() => {
        closePopup();
        if (!gameCompleted) initGame(); // Move to the next word if game is not completed
      }, 2000);
    }
     
    function displayLevelCompleted() {
      gameCompleted = true;
      displayPopup("Level Completed!");
      setTimeout(() => {
        closePopup();
        displayScore();
      }, 3000);
    }
  
    function closePopup() {
      popup.style.display = 'none';
    }
  
    function displayScore() {
      scoreDisplay.textContent = `Words Completed: ${completedWords}, Words Incomplete: ${incompleteWords}`;
      scoreDisplay.style.position = 'absolute';
      scoreDisplay.style.bottom = '10px';
      scoreDisplay.style.left = '10px';
      scoreDisplay.style.color = '#000000';
      document.body.appendChild(scoreDisplay);
    }
  
    startBtn.addEventListener("click", function() {
      // Enable game elements
      wordText.style.display = "block";
      document.querySelector('.details').style.display = "block";
      inputField.disabled = false;
      document.querySelector('.buttons').style.display = "flex";
  
      // Hide start button
      startBtn.style.display = "none";
  
      // Initialize the game
      initGame();
  
      // Play background music
      backgroundMusic.play();
    });
  
    audioToggle.addEventListener("click", function() {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        audioToggle.textContent = "Sound On";
      } else {
        backgroundMusic.pause();
        audioToggle.textContent = "Sound Off";
      }
    });
  });