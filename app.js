/* =========================
   LESSON DATA (REAL ISL)
========================= */
const LESSON_1 = [
  {
    title: "HELLO",
    description: "Open hand moves outward from the forehead in greeting.",
    animation: "hello"
  },
  {
    title: "HOW ARE YOU",
    description: "Both hands form ‘Y’ shapes and rotate slightly toward the person.",
    animation: "how"
  },
  {
    title: "I AM FINE",
    description: "Thumb moves upward from the chest to show well-being.",
    animation: "fine"
  }
];

/* =========================
   STATE
========================= */
let currentIndex = 0;

/* =========================
   DOM
========================= */
const startScreen = document.getElementById("startScreen");
const lessonScreen = document.getElementById("lessonScreen");

const startBtn = document.getElementById("startLearningBtn");
const nextBtn = document.getElementById("nextSignBtn");

const signTitle = document.getElementById("signTitle");
const signDescription = document.getElementById("signDescription");
const rightHand = document.getElementById("rightHand");

/* =========================
   NAVIGATION
========================= */
startBtn.onclick = () => {
  startScreen.classList.remove("active");
  lessonScreen.classList.add("active");
  showSign();
};

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex >= LESSON_1.length) {
    signTitle.textContent = "Lesson Complete 🎉";
    signDescription.textContent =
      "You’ve learned basic greetings in Indian Sign Language.";
    nextBtn.style.display = "none";
    return;
  }
  showSign();
};

/* =========================
   CORE DISPLAY LOGIC
========================= */
function showSign() {
  const sign = LESSON_1[currentIndex];

  signTitle.textContent = sign.title;
  signDescription.textContent = sign.description;

  // reset animation
  rightHand.className = "hand right";

  // trigger animation
  requestAnimationFrame(() => {
    rightHand.classList.add("sign-known");
  });
}
