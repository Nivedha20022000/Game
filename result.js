document.addEventListener('DOMContentLoaded', function () {
   
    const correctCount = localStorage.getItem('correctCount') || 0;
    const totalQuestions = localStorage.getItem('totalQuestions') || 0;

    // Calculate the incorrect count
    const attemptedQuestions = parseInt(totalQuestions) - parseInt(correctCount);
    const incorrectCount = Math.max(attemptedQuestions, 0);

    // Display the result text and counts on the result page
    const resultContainer = document.getElementById('resultContainer');
 
 

    const correctCountElement = document.getElementById('correctCount');
    correctCountElement.textContent = `Correct Count: ${correctCount}`;

    const incorrectCountElement = document.getElementById('incorrectCount');
    incorrectCountElement.textContent = `Incorrect Count: ${incorrectCount}`;
   
});

function displayCorrectCount() {
    const correctCount = localStorage.getItem('correctCount') || 0;
    alert(`Correct Count: ${correctCount}`);
}

function displayIncorrectCount() {
    const correctCount = parseInt(localStorage.getItem('correctCount')) || 0;
    const totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 0;
    const attemptedQuestions = parseInt(localStorage.getItem('incorrectCount')) || 0;
    const incorrectCount = Math.max(totalQuestions - correctCount - attemptedQuestions, 0);
    alert(`Incorrect Count: ${incorrectCount}`);
}

function redirectToLevel() {
    // Redirect to the level page (replace 'levelpage1.html' with the actual filename)
    window.location.href = 'levelpage1.html';
}