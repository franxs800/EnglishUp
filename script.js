
document.addEventListener("DOMContentLoaded", () => {
    console.log("EnglishUp: главная страница загружена!");

    const startButton = document.querySelector(".hero .btn");

    if (startButton) {
        startButton.addEventListener("click", () => {
            console.log("Пользователь перешёл к курсам.");
        });
    }
});
