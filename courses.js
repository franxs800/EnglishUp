
const courses = [
    {
        level: "A1",
        name: "Английский с нуля",
        description: "Базовые слова, приветствия и простые предложения.",
        lessons: [
            ["Приветствие", "Hello! — Привет!", "My name is Anna. — Меня зовут Анна."],
            ["Глагол to be", "I am a student. — Я студент.", "She is happy. — Она счастлива."],
            ["Present Simple", "I work every day. — Я работаю каждый день.", "He likes music. — Он любит музыку."]
        ]
    },
    {
        level: "A2",
        name: "Повседневный английский",
        description: "Разговоры о семье, работе и повседневной жизни.",
        lessons: [
            ["Мой день", "I get up at seven. — Я встаю в семь.", "I have breakfast. — Я завтракаю."],
            ["Past Simple", "I watched a film yesterday. — Вчера я посмотрел фильм.", "She visited her friend. — Она навестила подругу."],
            ["Планы на будущее", "I will call you. — Я тебе позвоню.", "We will travel tomorrow. — Завтра мы отправимся в путешествие."]
        ]
    },
    {
        level: "B1",
        name: "Уверенное общение",
        description: "Развитие речи, сложные предложения и новые выражения.",
        lessons: [
            ["Выражение мнения", "I think this is a good idea. — Я думаю, это хорошая идея.", "In my opinion, it is useful. — По моему мнению, это полезно."],
            ["Present Perfect", "I have finished my work. — Я закончил свою работу.", "She has visited London. — Она побывала в Лондоне."],
            ["Условные предложения", "If it rains, I will stay home. — Если пойдёт дождь, я останусь дома.", "If I have time, I will help you. — Если у меня будет время, я помогу тебе."]
        ]
    }
];

const courseGrid = document.getElementById("courseGrid");
const courseSearch = document.getElementById("courseSearch");
const levelFilter = document.getElementById("levelFilter");
const courseMessage = document.getElementById("courseMessage");
const lessonArea = document.getElementById("lessonArea");
const lessonContent = document.getElementById("lessonContent");

function renderCourses() {
    const query = courseSearch.value.trim().toLowerCase();
    const level = levelFilter.value;

    const filtered = courses.filter(course =>
        (level === "all" || course.level === level) &&
        (course.name.toLowerCase().includes(query) ||
         course.description.toLowerCase().includes(query) ||
         course.level.toLowerCase().includes(query))
    );

    courseGrid.replaceChildren();
    courseMessage.textContent = filtered.length
        ? ""
        : "Курсы не найдены. Попробуй другой запрос.";

    filtered.forEach(course => {
        const card = document.createElement("article");
        card.className = "card";

        const badge = document.createElement("span");
        badge.className = "course-level";
        badge.textContent = course.level;

        const title = document.createElement("h3");
        title.textContent = course.name;

        const description = document.createElement("p");
        description.textContent = course.description;

        const info = document.createElement("p");
        info.textContent = `Уроков: ${course.lessons.length}`;

        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = "Начать курс →";
        button.addEventListener("click", () => openCourse(course));

        card.append(badge, title, description, info, button);
        courseGrid.appendChild(card);
    });
}

function openCourse(course) {
    lessonContent.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = course.name;

    const intro = document.createElement("p");
    intro.textContent = "Уровень: " + course.level;

    lessonContent.append(heading, intro);

    course.lessons.forEach((lesson, index) => {
        const block = document.createElement("article");
        const title = document.createElement("h3");
        title.textContent = `Урок ${index + 1}. ${lesson[0]}`;

        block.appendChild(title);

        lesson.slice(1).forEach(line => {
            const paragraph = document.createElement("p");
            paragraph.textContent = line;
            block.appendChild(paragraph);
        });

        const key = `englishUpLesson_${course.level}_${index}`;
        const done = document.createElement("input");
        done.type = "checkbox";
        done.id = key;
        done.checked = localStorage.getItem(key) === "true";

        done.addEventListener("change", () => {
            localStorage.setItem(key, String(done.checked));
        });

        const label = document.createElement("label");
        label.htmlFor = key;
        label.textContent = " Урок пройден";

        block.append(done, label);
        lessonContent.appendChild(block);
    });

    lessonArea.hidden = false;
    lessonArea.scrollIntoView({ behavior: "smooth" });
}

courseSearch.addEventListener("input", renderCourses);
levelFilter.addEventListener("change", renderCourses);

document.getElementById("closeLesson").addEventListener("click", () => {
    lessonArea.hidden = true;
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
});

renderCourses();
