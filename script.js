const questions = [
    {
        question: "What color is the sky on a clear day?",
        answers: [
            { Text: "Green", correct: false },
            { Text: "Blue", correct: true },
            { Text: "Red", correct: false },
            { Text: "Yellow", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { Text: "3", correct: false },
            { Text: "4", correct: true },
            { Text: "5", correct: false },
            { Text: "6", correct: false }
        ]
    },
    {
        question: "Which animal is known as man's best friend?",
        answers: [
            { Text: "Cat", correct: false },
            { Text: "Dog", correct: true },
            { Text: "Bird", correct: false },
            { Text: "Fish", correct: false }
        ]
    },
    {
        question: "What do you use to write on a chalkboard?",
        answers: [
            { Text: "Pen", correct: false },
            { Text: "Marker", correct: false },
            { Text: "Chalk", correct: true },
            { Text: "Crayon", correct: false }
        ]
    },
    {
        question: "What is the name of the shape with three sides?",
        answers: [
            { Text: "Square", correct: false },
            { Text: "Circle", correct: false },
            { Text: "Triangle", correct: true },
            { Text: "Rectangle", correct: false }
        ]
    },
    {
        question: "Which fruit is known for having its seeds on the outside?",
        answers: [
            { Text: "Apple", correct: false },
            { Text: "Banana", correct: false },
            { Text: "Strawberry", correct: true },
            { Text: "Orange", correct: false }
        ]
    },
    {
        question: "What is the name of the toy that bounces?",
        answers: [
            { Text: "Doll", correct: false },
            { Text: "Car", correct: false },
            { Text: "Ball", correct: true },
            { Text: "Puzzle", correct: false }
        ]
    },
    {
        question: "What is the capital of the United States?",
        answers: [
            { Text: "New York", correct: false },
            { Text: "Los Angeles", correct: false },
            { Text: "Washington, D.C.", correct: true },
            { Text: "Chicago", correct: false }
        ]
    },
    {
        question: "How many days are there in a week?",
        answers: [
            { Text: "5", correct: false },
            { Text: "6", correct: false },
            { Text: "7", correct: true },
            { Text: "8", correct: false }
        ]
    },
    {
        question: "Which day comes after Monday?",
        answers: [
            { Text: "Sunday", correct: false },
            { Text: "Tuesday", correct: true },
            { Text: "Wednesday", correct: false },
            { Text: "Thursday", correct: false }
        ]
    },
    {
        question: "What is the primary color of a school bus?",
        answers: [
            { Text: "Red", correct: false },
            { Text: "Blue", correct: false },
            { Text: "Yellow", correct: true },
            { Text: "Green", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", () => selectAnswer(answer, button));
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer, button) {
    const correct = answer.correct;
    if (correct) {
        button.style.backgroundColor = "green";
        score++;
    } else {
        button.style.backgroundColor = "red";
    }

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn.innerHTML === answer.Text && correct) {
            btn.style.backgroundColor = "green";
        } else if (btn.innerHTML === answer.Text) {
            btn.style.backgroundColor = "red";
        }
    });

    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleKeyboardInput(event) {
    if (event.key === "ArrowRight") {
        if (nextButton.style.display === "block") {
            nextQuestion();
        }
    } else if (event.key === "r" || event.key === "R") {
        if (nextButton.innerHTML === "Restart") {
            startQuiz();
        }
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

document.addEventListener("keydown", handleKeyboardInput);

startQuiz();