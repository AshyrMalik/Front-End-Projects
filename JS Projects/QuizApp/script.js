const quizData = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correct: "c"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: {
            a: "Harper Lee",
            b: "Mark Twain",
            c: "Ernest Hemingway",
            d: "F. Scott Fitzgerald"
        },
        correct: "a"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: {
            a: "Atlantic Ocean",
            b: "Indian Ocean",
            c: "Pacific Ocean",
            d: "Arctic Ocean"
        },
        correct: "c"
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: {
            a: "Leonardo da Vinci",
            b: "Vincent van Gogh",
            c: "Pablo Picasso",
            d: "Michelangelo"
        },
        correct: "a"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: {
            a: "Mars",
            b: "Jupiter",
            c: "Venus",
            d: "Saturn"
        },
        correct: "a"
    },
    {
        question: "Who developed the theory of relativity?",
        answers: {
            a: "Isaac Newton",
            b: "Albert Einstein",
            c: "Galileo Galilei",
            d: "Nikola Tesla"
        },
        correct: "b"
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: {
            a: "African Elephant",
            b: "Blue Whale",
            c: "Giraffe",
            d: "Polar Bear"
        },
        correct: "b"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: {
            a: "China",
            b: "Japan",
            c: "South Korea",
            d: "Thailand"
        },
        correct: "b"
    },
    {
        question: "Who painted 'Starry Night'?",
        answers: {
            a: "Vincent van Gogh",
            b: "Claude Monet",
            c: "Pablo Picasso",
            d: "Salvador Dalí"
        },
        correct: "a"
    },
    {
        question: "What is the capital of Australia?",
        answers: {
            a: "Sydney",
            b: "Melbourne",
            c: "Canberra",
            d: "Perth"
        },
        correct: "c"
    }
];

let questionIndex = 0;
let score = 0;
let timer;
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function startQuiz() {
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const currQuestion = quizData[questionIndex];
    questionElement.innerText = currQuestion.question;
    answersElement.innerHTML = "";

    for (const key in currQuestion.answers) {
        const answer = currQuestion.answers[key];
        const li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="radio" name="answer" value="${key}">
                ${answer}
            </label>
        `;
        answersElement.appendChild(li);
    }
}

function nextQuestion() {
    const selectedAns = document.querySelector("input[name='answer']:checked");
    if (selectedAns) {
        if (selectedAns.value === quizData[questionIndex].correct) {
            score++;
        }
        questionIndex++;
        if (questionIndex < quizData.length) {
            displayQuestion();
            resetTimer();
        } else {
            endQuiz();
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}

function endQuiz() {
    questionElement.innerText = "Quiz Completed!";
    answersElement.innerHTML = '';
    scoreElement.innerText = `Your score: ${score} out of ${quizData.length}`;
    clearInterval(timer);
    document.getElementById("timer").innerHTML=" "
}

function previousQuestion() {
    if (questionIndex > 0) {
        questionIndex--;
        displayQuestion();
        resetTimer();
    }
}

function startTimer() {
    let timeLeft = 30;
    timerElement.innerText = `Time Left: ${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}
