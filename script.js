const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Machine Language", "None of the above"],
        answer: "HyperText Markup Language",
    },
    {
        question: "Which programming language is known as the mother of all languages?",
        options: ["C", "Assembly", "Fortran", "Java"],
        answer: "C",
    },
    {
        question: "Which of the following is used for styling web pages?",
        options: ["HTML", "JavaScript", "CSS", "PHP"],
        answer: "CSS",
    },
    {
        question: "What is the correct syntax to output 'Hello World' in JavaScript?",
        options: ["echo('Hello World');", "print('Hello World');", "System.out.println('Hello World');", "console.log('Hello World');"],
        answer: "console.log('Hello World');",
    },
    {
        question: "Which of the following is NOT a valid data type in Java?",
        options: ["int", "boolean", "double", "integer"],
        answer: "integer",
    },
    {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "/* */", "#", "<!-- -->"],
        answer: "#",
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Structured Question Language", "Simple Query Logic"],
        answer: "Structured Query Language",
    },
    {
        question: "Which company developed the Python programming language?",
        options: ["Google", "Microsoft", "Apple", "Python Software Foundation"],
        answer: "Python Software Foundation",
    },
    {
        question: "What is the correct syntax for a function in JavaScript?",
        options: ["function myFunction()", "def myFunction()", "function: myFunction()", "func myFunction()"],
        answer: "function myFunction()",
    },
    {
        question: "Which of the following is a programming paradigm?",
        options: ["Object-Oriented Programming", "Markup Programming", "Script Programming", "None of the above"],
        answer: "Object-Oriented Programming",
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
