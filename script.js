const questionElement = document.getElementById("questionElement");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("next");

let questionList = [
    {
        question: "What is the capital of Uttar Pradesh?",
        answers: [
            { text: "Lucknow", correct: true },
            { text: "Kanpur", correct: false },
            { text: "Varanasi", correct: false },
            { text: "Agra", correct: false }
        ]
    }, 
    {
        question: "How many total states are there in India?",
        answers: [
            { text: "29", correct: false },
            { text: "30", correct: false },
            { text: "28", correct: true },
            { text: "31", correct: false }
        ]
    }, 
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Delhi", correct: true },
            { text: "Bangalore", correct: false }
        ]
    }, 
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Tiger", correct: true },
            { text: "Elephant", correct: false },
            { text: "Leopard", correct: false }
        ]
    }, 
    {
        question: "Who is the Prime Minister of India?",
        answers: [
            { text: "Rahul Gandhi", correct: false },
            { text: "Amit Shah", correct: false },
            { text: "Yogi Adityanath", correct: false },
            { text: "Narendra Modi", correct: true }
        ]
    }
]

let score = 0;
let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questionList[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questionList.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questionList.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questionList.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();