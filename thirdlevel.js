const words = [
    'algorithm',
    'programming',
    'database',
    'server',
    'software',
    'hardware',
    'network',
    'encryption',
    'interface',
    'authentication',
   ];
  
  let currentQuestionIndex = 0;
  let timerInterval;
  let timerSeconds = 0;
  let timerPaused = false;
  let correctCount = 0;
  let totalQuestions = words.length;
  
  function generateQuestion() {
    const currentQuestion = words[currentQuestionIndex];
    document.getElementById('question').innerText = `Convert "${currentQuestion}" to its alphabet numbers:`;
  
    // Reset the timer seconds
    timerSeconds = 0;
    timerPaused = false;
  
    // Update the timer display
    updateTimerDisplay();
  }
  
  function updateCounts(isCorrect) {
    if (isCorrect) {
      correctCount++;
    }
  }
  function checkAnswer() {
      const currentQuestion = words[currentQuestionIndex];
      const userAnswer = document.getElementById('answer').value.trim();
  
      if (userAnswer === '') {
          if (timerSeconds === 60) {
              showTimeUpModal();
          } else {
              // Show the "Please enter a value" popup message
              showEmptyAnswerModal();
          }
          return; // Exit the function early
      }
  
      const correctAnswer = stringToAlphabetNumbers(currentQuestion);
  
      if (userAnswer.toLowerCase() === correctAnswer) {
          // Show the "Correct" popup message
          showCorrectWellDoneModal();
          updateCounts(true);
      } else {
          // Show the "Incorrect" popup message
          showIncorrectAnswerModal(correctAnswer);
          updateCounts(false);
      }
  
      // Check and show congratulation if necessary
      checkAndShowCongratulation();
  }
  
  
  function checkAndShowCongratulation() {
    if (currentQuestionIndex === words.length - 1) {
      // If it's the last question, show the congratulation modal
      showCongratulationModal();
    }
  }
  
  function incrementIncorrectCount() {
    // Function to increment incorrect count if needed
  }
  
  function saveResult() {
    // Save the correct count and total questions to localStorage
    localStorage.setItem('correctCount', correctCount);
    localStorage.setItem('totalQuestions', totalQuestions);
  }
  
  function showCorrectWellDoneModal() {
    const modal = document.getElementById('correctWellDoneModal');
    modal.style.display = 'block';
    pauseTimer();
    setTimeout(closeCorrectWellDoneModal, 2000);
  }
  
  function closeCorrectWellDoneModal() {
    const modal = document.getElementById('correctWellDoneModal');
    modal.style.display = 'none';
    moveToNextQuestion();
  }
  function showIncorrectAnswerModal(correctAnswer) {
    const modal = document.getElementById('incorrectModal');
    const modalMessage = document.getElementById('incorrectMessage');
    modalMessage.innerText = `Incorrect. The correct answer is: ${correctAnswer}. Try again.`;
    modal.style.display = 'block';
  pauseTimer();
    // Automatically close the modal after 3 seconds
    setTimeout(function() {
      modal.style.display = 'none';
      moveToNextQuestion(); // Move to the next question after closing the modal
    }, 3000);
  }
  
  
  
  function showResultPage() {
    saveResult(); // Save the counts before redirecting to the result page
    window.location.href = 'result1.html'; // Update the URL based on your file structure
  }
  
  function moveToNextQuestion() {
    const userAnswer = document.getElementById('answer').value.trim();
  
    // Check if the text box is empty before moving to the next question
    if (userAnswer === '' && currentQuestionIndex < words.length - 1) {
      showEmptyAnswerModal();
      return;
    }
  
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < words.length) {
      // Display the next question
      generateQuestion();
      setTimer();
    } else if (currentQuestionIndex === words.length) {
      // If all questions are answered except the final one, show the congratulation modal
      showCongratulationModal();
    }
  }
  
  function showCongratulationModal() {
    const modal = document.getElementById('congratulationModal');
    modal.style.display = 'block';
  }
  
  function closeCongratulationModal() {
    const modal = document.getElementById('congratulationModal');
    modal.style.display = 'none';
    showResultPage();
  }
  
  function showEmptyAnswerModal() {
    const modal = document.getElementById('emptyAnswerModal');
    modal.style.display = 'block';
  }
  
  function closeEmptyAnswerModal() {
    const modal = document.getElementById('emptyAnswerModal');
    modal.style.display = 'none';
  }
  
  function showTimeUpModal() {
    const modal = document.getElementById('timeUpModal');
    modal.style.display = 'block';
   
  setTimeout(function() {
      modal.style.display = 'none';
      moveToNextQuestion();
    }, 2000);
  }
  
  function showTimeUpModal() {
    const modal = document.getElementById('timeUpModal');
    modal.style.display = 'block';
   
    // Close the modal after a delay
    setTimeout(function() {
        modal.style.display = 'none';
        moveToNextQuestion(); // Move to the next question after displaying the modal
    }, 2000); // Adjust the delay as needed
}

function closeTimeUpModal() {
    const modal = document.getElementById('timeUpModal');
    modal.style.display = 'none';
}
  
  function updateTimerDisplay() {
    document.getElementById('timer').innerText = `Timer: ${timerSeconds}s`;
  }
  
  function stringToAlphabetNumbers(str) {
    let alphabetNumberResult = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.toLowerCase().charCodeAt(i) - 'a'.charCodeAt(0) + 1;
      alphabetNumberResult += charCode;
    }
    return alphabetNumberResult;
  }
  
  function setTimer() {
    resetTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    if (!timerPaused) {
        if (timerSeconds < 60) {
            timerSeconds++;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            showTimeUpModal(); // Display the Time's Up! modal
        }
    }
}

  
  function resetTimer() {
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateTimerDisplay();
  }
  
  function pauseTimer() {
    timerPaused = true;
  }
  
  function startGame() {
    generateQuestion();
    setTimer();
  }
  
  function restartGame() {
    currentQuestionIndex = 0;
    generateQuestion();
    clearAnswerAndResult();
    resetTimer();
    setTimer();
  }
  
  function clearAnswerAndResult() {
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
  }
  
  function redirectToResult() {
    // Save the result text to localStorage
    const correctCount = localStorage.getItem('correctCount') || 0;
    const totalQuestions = localStorage.getItem('totalQuestions') || 0;
   
    // Redirect to the result page
    window.location.href = 'result1.html'; // Replace 'result1.html' with your actual result page file
  }
  
  
  function displayCorrectCount() {
    alert(`Correct Count: ${correctCount}`);
  }
  
  // Function to show the total result
  function displayTotalResult() {
    alert(`Total Result: ${totalQuestionsAttempted}`);
  }
  function toggleBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('musicToggleButton');
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleButton.innerText = "Sound On";
    } else {
        backgroundMusic.pause();
        toggleButton.innerText = "Sound Off";
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
  });
  
  // Define your resetGame() function if needed
  function resetGame() {
    // Your resetGame() logic here
  }
  