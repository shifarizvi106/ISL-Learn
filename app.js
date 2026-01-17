const lessons = [
    { word: "HELLO", answer: "wave" },
    { word: "THANKS", answer: "chin outward" },
    { word: "WATER", answer: "w hand at chin" }
];

let current = 0;

const questionWord = document.getElementById("questionWord");
const input = document.getElementById("answerInput");
const feedback = document.getElementById("feedbackText");
const button = document.getElementById("checkBtn");
const dots = document.querySelectorAll(".dot");

const leftHand = document.getElementById("leftHand");
const rightHand = document.getElementById("rightHand");

function loadLesson() {
    questionWord.textContent = lessons[current].word;
    input.value = "";
    feedback.textContent = "Type the sign meaning below";
    updateDots();
}

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
    });
}

function resetHands() {
    leftHand.className = "hand left";
    rightHand.className = "hand right";
}

button.addEventListener("click", () => {
    const userAnswer = input.value.toLowerCase();
    const correct = lessons[current].answer;

    resetHands();

    if (userAnswer.includes(correct)) {
        feedback.textContent = "Correct! 🎉";
        rightHand.classList.add("sign-known");

        setTimeout(() => {
            current++;
            if (current < lessons.length) {
                loadLesson();
            } else {
                feedback.textContent = "Lesson complete! 🌟";
                questionWord.textContent = "DONE";
                button.disabled = true;
            }
        }, 800);

    } else {
        feedback.textContent = "Try again 💭";
        rightHand.classList.add("sign-wrong");
    }
});

loadLesson();
