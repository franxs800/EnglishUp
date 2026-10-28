
const questions = [
    {
        question: 'Как переводится "Apple"?',
        answers: ["Яблоко", "Апельсин", "Груша", "Банан"],
        correct: 0,
        explanation: "Apple означает «яблоко»."
    },
    {
        question: "Выбери правильное предложение.",
        answers: [
            "She go to school.",
            "She goes to school.",
            "She going to school.",
            "She gone to school."
        ],
        correct: 1,
        explanation: "В Present Simple с she к глаголу обычно добавляется -s."
    },
    {
        question: 'Как переводится "Yesterday"?',
        answers: ["Сегодня", "Завтра", "Вчера", "Неделя"],
        correct: 2,
        explanation: "Yesterday означает «вчера»."
    },
    {
        question: "Заполни пропуск: I ___ a student.",
        answers: ["is", "are", "am", "be"],
        correct: 2,
        explanation: "С местоимением I используется форма am."
    },
    {
        question: 'Какое слово означает "Beautiful"?',
        answers: ["Быстрый", "Красивый", "Сильный", "Медленный"],
        correct: 1,
        explanation: "Beautiful означает «красивый» или «прекрасный»."
    },
    {
        question: "Выбери правильное предложение в Past Simple.",
        answers: [
            "I visit my friend yesterday.",
            "I visited my friend yesterday.",
            "I visiting my friend yesterday.",
            "I visits my friend yesterday."
        ],
        correct: 1,
        explanation: "Для правильного глагола visit прошедшая форма — visited."
    },
    {
        question: "Заполни пропуск: They ___ playing football now.",
        answers: ["is", "am", "be", "are"],
        correct: 3,
        explanation: "В Present Continuous с they используется are + глагол с -ing."
    },
    {
        question: 'Как переводится "Teacher"?',
        answers: ["Доктор", "Учитель", "Инженер", "Водитель"],
        correct: 1,
        explanation: "Teacher означает «учитель»."
    },
    {
        question: "Выбери правильный артикль: ___ apple.",
        answers: ["A", "An", "The only", "Am"],
        correct: 1,
        explanation: "Перед apple используется an, поскольку слово начинается с гласного звука."
    },
    {
        question: "Заполни пропуск: Tomorrow, I ___ visit my friend.",
        answers: ["visited", "visiting", "will", "am yesterday"],
        correct: 2,
        explanation: "Will + начальная форма глагола используется для Future Simple."
    }
];

const questionNumber = document.getElementById("questionNumber");
const scoreLabel = document.getElementById("scoreLabel");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const quizProgress = document.getElementById("quizProgress");
const resultPanel = document.getElementById("resultPanel");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const restartButton = document.getElementById("restartButton");

let current = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const item = questions[current];

    questionNumber.textContent =
        `Вопрос ${current + 1} из ${questions.length}`;

    scoreLabel.textContent = `Баллы: ${score}`;
    questionText.textContent = item.question;
    quizProgress.style.width =
        `${current / questions.length * 100}%`;

    feedback.textContent = "";
    answerOptions.replaceChildren();
    nextButton.disabled = true;
    nextButton.hidden = false;
    resultPanel.hidden = true;

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answerOptions.appendChild(button);
    });

    nextButton.textContent =
        current === questions.length - 1
            ? "Посмотреть результат"
            : "Следующий вопрос →";
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const item = questions[current];
    const buttons = answerOptions.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === item.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && selectedIndex !== item.correct) {
            button.classList.add("incorrect");
        }
    });

    if (selectedIndex === item.correct) {
        score++;
        feedback.textContent = "Правильно! 🎉 " + item.explanation;
    } else {
        feedback.textContent = "Попробуй запомнить! 💡 " + item.explanation;
    }

    scoreLabel.textContent = `Баллы: ${score}`;
    nextButton.disabled = false;
}

function showResult() {
    questionNumber.textContent = "Тест завершён!";
    questionText.hidden = true;
    answerOptions.hidden = true;
    feedback.hidden = true;
    nextButton.hidden = true;
    resultPanel.hidden = false;

    const percent = Math.round(score / questions.length * 100);

    quizProgress.style.width = "100%";
    resultTitle.textContent = `Твой результат: ${percent}%`;
    resultText.textContent =
        `Правильных ответов: ${score} из ${questions.length}. ` +
        (percent >= 80
            ? "Отличный результат! Продолжай обучение! 🌟"
            : percent >= 50
                ? "Хорошая работа! Повтори сложные темы и попробуй снова."
                : "Не сдавайся! Повтори материал и пройди тест ещё раз.");

    localStorage.setItem("englishUpTestResult", JSON.stringify({
        score: score,
        total: questions.length,
        percent: percent,
        date: new Date().toISOString()
    }));
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (current < questions.length - 1) {
        current++;
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    current = 0;
    score = 0;
    questionText.hidden = false;
    answerOptions.hidden = false;
    feedback.hidden = false;
    showQuestion();
});

showQuestion();
