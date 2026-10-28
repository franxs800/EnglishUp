
const words = [
    { en: "Mother", ru: "Мама", category: "Семья", example: "My mother is kind." },
    { en: "Father", ru: "Папа", category: "Семья", example: "My father is at home." },
    { en: "Sister", ru: "Сестра", category: "Семья", example: "I have a sister." },
    { en: "Brother", ru: "Брат", category: "Семья", example: "My brother is funny." },
    { en: "Family", ru: "Семья", category: "Семья", example: "I love my family." },
    { en: "Book", ru: "Книга", category: "Учёба", example: "This is my book." },
    { en: "Teacher", ru: "Учитель", category: "Учёба", example: "My teacher is nice." },
    { en: "Student", ru: "Ученик", category: "Учёба", example: "I am a student." },
    { en: "School", ru: "Школа", category: "Учёба", example: "We go to school." },
    { en: "Pen", ru: "Ручка", category: "Учёба", example: "I have a blue pen." },
    { en: "Apple", ru: "Яблоко", category: "Еда", example: "I eat an apple." },
    { en: "Bread", ru: "Хлеб", category: "Еда", example: "I buy fresh bread." },
    { en: "Water", ru: "Вода", category: "Еда", example: "I drink water." },
    { en: "Breakfast", ru: "Завтрак", category: "Еда", example: "Breakfast is ready." },
    { en: "Vegetable", ru: "Овощ", category: "Еда", example: "This vegetable is fresh." },
    { en: "Travel", ru: "Путешествовать", category: "Путешествия", example: "I love to travel." },
    { en: "Airport", ru: "Аэропорт", category: "Путешествия", example: "We are at the airport." },
    { en: "Ticket", ru: "Билет", category: "Путешествия", example: "I have a ticket." },
    { en: "Hotel", ru: "Отель", category: "Путешествия", example: "The hotel is beautiful." },
    { en: "Journey", ru: "Путешествие", category: "Путешествия", example: "Have a safe journey." },
    { en: "Office", ru: "Офис", category: "Работа", example: "I work in an office." },
    { en: "Meeting", ru: "Встреча", category: "Работа", example: "The meeting starts at ten." },
    { en: "Manager", ru: "Руководитель", category: "Работа", example: "My manager is helpful." },
    { en: "Business", ru: "Бизнес", category: "Работа", example: "She has a small business." },
    { en: "Salary", ru: "Зарплата", category: "Работа", example: "He gets his salary monthly." },
    { en: "House", ru: "Дом", category: "Повседневная жизнь", example: "My house is big." },
    { en: "Friend", ru: "Друг", category: "Повседневная жизнь", example: "She is my best friend." },
    { en: "Happy", ru: "Счастливый", category: "Повседневная жизнь", example: "I am happy today." },
    { en: "Beautiful", ru: "Красивый", category: "Повседневная жизнь", example: "It is a beautiful day." },
    { en: "Learn", ru: "Учить, изучать", category: "Повседневная жизнь", example: "I learn English every day." }
];

const wordGrid = document.getElementById("wordGrid");
const wordSearch = document.getElementById("wordSearch");
const categoryFilter = document.getElementById("categoryFilter");
const favoritesToggle = document.getElementById("favoritesToggle");
const wordMessage = document.getElementById("wordMessage");
const wordCount = document.getElementById("wordCount");
const favoriteCount = document.getElementById("favoriteCount");

let favorites = JSON.parse(localStorage.getItem("englishUpFavorites") || "[]");
let onlyFavorites = false;
let flashIndex = 0;
let flashStarted = false;

function renderWords() {
    const query = wordSearch.value.trim().toLowerCase();
    const category = categoryFilter.value;

    const filtered = words.filter(word => {
        const matchesSearch =
            word.en.toLowerCase().includes(query) ||
            word.ru.toLowerCase().includes(query);

        const matchesCategory =
            category === "all" || word.category === category;

        const matchesFavorite =
            !onlyFavorites || favorites.includes(word.en);

        return matchesSearch && matchesCategory && matchesFavorite;
    });

    wordGrid.replaceChildren();
    wordCount.textContent = filtered.length;
    favoriteCount.textContent = favorites.length;
    wordMessage.textContent = filtered.length
        ? ""
        : "Ничего не найдено. Измени запрос или категорию.";

    filtered.forEach(word => {
        const card = document.createElement("article");
        card.className = "word-card";

        const title = document.createElement("h3");
        title.textContent = word.en;

        const translation = document.createElement("p");
        translation.textContent = "Перевод: " + word.ru;

        const categoryText = document.createElement("p");
        categoryText.textContent = "Категория: " + word.category;

        const example = document.createElement("p");
        example.className = "example";
        example.textContent = word.example;

        const button = document.createElement("button");
        button.className = "favorite-button";
        button.textContent = favorites.includes(word.en)
            ? "★ Убрать из избранного"
            : "☆ В избранное";

        button.addEventListener("click", () => {
            if (favorites.includes(word.en)) {
                favorites = favorites.filter(item => item !== word.en);
            } else {
                favorites.push(word.en);
            }

            localStorage.setItem(
                "englishUpFavorites",
                JSON.stringify(favorites)
            );

            renderWords();
        });

        card.append(title, translation, categoryText, example, button);
        wordGrid.appendChild(card);
    });
}

wordSearch.addEventListener("input", renderWords);
categoryFilter.addEventListener("change", renderWords);

favoritesToggle.addEventListener("click", () => {
    onlyFavorites = !onlyFavorites;
    favoritesToggle.textContent = onlyFavorites
        ? "Показать все слова"
        : "☆ Избранное";

    renderWords();
});

const flashWord = document.getElementById("flashWord");
const flashAnswer = document.getElementById("flashAnswer");
const revealFlashcard = document.getElementById("revealFlashcard");
const nextFlashcard = document.getElementById("nextFlashcard");

function showFlashcard() {
    const word = words[flashIndex % words.length];

    flashWord.textContent = word.en;
    flashAnswer.textContent = word.ru + " — " + word.example;
    flashAnswer.hidden = true;

    revealFlashcard.disabled = false;
    nextFlashcard.disabled = false;
    flashStarted = true;
}

document.getElementById("startFlashcards").addEventListener("click", () => {
    flashIndex = 0;
    showFlashcard();
});

revealFlashcard.addEventListener("click", () => {
    if (flashStarted) {
        flashAnswer.hidden = false;
    }
});

nextFlashcard.addEventListener("click", () => {
    if (!flashStarted) return;
    flashIndex++;
    showFlashcard();
});

renderWords();
