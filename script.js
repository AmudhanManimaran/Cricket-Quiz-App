const quizData = [
    {
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Brazil", "Germany", "Argentina", "Italy"],
        answer: "Brazil",
    },
    {
        question: "Who holds the record for the most Grand Slam titles in men’s tennis?",
        options: ["Rafael Nadal", "Novak Djokovic", "Roger Federer", "Pete Sampras"],
        answer: "Novak Djokovic",
    },
    {
        question: "In cricket, what is the maximum number of overs allowed per bowler in a standard One Day International (ODI) match?",
        options: ["10", "15", "20", "25"],
        answer: "10",
    },
    {
        question: "Which country hosted the first-ever Olympic Games in 1896?",
        options: ["France", "Greece", "USA", "Italy"],
        answer: "Greece",
    },
    {
        question: "Which basketball player is known as 'His Airness'?",
        options: ["LeBron James", "Kobe Bryant", "Michael Jordan", "Shaquille O'Neal"],
        answer: "Michael Jordan",
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars",
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
        answer: "Albert Einstein",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
    },
    {
        question: "Which famous artist painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
    },
];


let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 10; // seconds
let timeLeft = timeLimit;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");

// Load Question
function loadQuestion() {
    clearInterval(timer);
    timeLeft = timeLimit;
    updateTimer();
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => handleOptionClick(button, currentQuestion.answer));
        optionsEl.appendChild(button);
    });

    updateProgress();
    startTimer();
}

// Handle Option Click
function handleOptionClick(selectedButton, correctAnswer) {
    clearInterval(timer);
    const options = document.querySelectorAll(".option");
    options.forEach((button) => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("wrong");
        }
    });

    if (selectedButton.textContent === correctAnswer) {
        score++;
    }
    nextBtn.disabled = false;
}

// Start Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(timer);
            autoSelectCorrectAnswer();
        }
    }, 1000);
}

// Auto-select correct answer if time runs out
function autoSelectCorrectAnswer() {
    const options = document.querySelectorAll(".option");
    options.forEach((button) => {
        button.disabled = true;
        if (button.textContent === quizData[currentQuestionIndex].answer) {
            button.classList.add("correct");
        }
    });
    nextBtn.disabled = false;
}

// Update Timer Display
function updateTimer() {
    timerEl.textContent = `Time left: ${timeLeft}s`;
}

// Update Progress
function updateProgress() {
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

// Next Button Click Event
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Show Results
function showResults() {
    questionEl.textContent = `You scored ${score} / ${quizData.length}!`;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none"; // Hide Next button

    // Restart button
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.classList.add("restart-btn");
    restartBtn.addEventListener("click", restartQuiz);
    optionsEl.appendChild(restartBtn);
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.style.display = "inline-block"; // Show Next button
    loadQuestion();
}

// Initialize Quiz
loadQuestion();
