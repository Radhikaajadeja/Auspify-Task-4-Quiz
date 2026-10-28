
const questions = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "2. Which language is used to style web pages?",
        options: ["Python", "CSS", "Java", "C++"],
        answer: 1
    },
    {
        question: "3. Which language makes a website interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "4. Which tag is used for the largest heading in HTML?",
        options: ["<h6>", "<head>", "<h1>", "<p>"],
        answer: 2
    },
    {
        question: "5. Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionElement.textContent = current.question;
    optionsContainer.innerHTML = "";
    nextButton.disabled = true;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        optionsContainer.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Show Result"
            : "Next Question";
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === correctAnswer) {
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    finalScore.textContent =
        `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");

    showQuestion();
});

showQuestion();
 