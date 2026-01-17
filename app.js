/* =========================
   SOUND
========================= */
const correctSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
const wrongSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");

/* =========================
   REAL ISL DATA (SIMPLIFIED)
========================= */
const ISL_DICTIONARY = {
  hello: {
    gloss: "HELLO",
    description: "Open hand moves outward from the forehead",
    handshape: "Open-5",
    location: "Forehead",
    mcq: [
      "Open hand wave from forehead",
      "Clapping hands",
      "Pointing forward",
      "Thumbs up"
    ],
    correctIndex: 0
  },
  thank_you: {
    gloss: "THANK-YOU",
    description: "Flat hand moves forward from the chin",
    handshape: "Flat",
    location: "Chin",
    mcq: [
      "Hand moves forward from chin",
      "Wave near forehead",
      "Tap chest",
      "Point down"
    ],
    correctIndex: 0
  },
  water: {
    gloss: "WATER",
    description: "‘W’ handshape taps the chin",
    handshape: "W",
    location: "Chin",
    mcq: [
      "W hand taps chin",
      "Cup hand forward",
      "Point to mouth",
      "Tap wrist"
    ],
    correctIndex: 0
  }
};

/* =========================
   LEVELS
========================= */
const LEVELS = [
  { name: "Greetings", questions: ["hello", "thank_you"] },
  { name: "Basics", questions: ["water"] }
];

/* =========================
   STATE
========================= */
let levelIndex = 0;
let questionIndex = 0;

/* =========================
   DOM
========================= */
const homeScreen = document.getElementById("homeScreen");
const learnScreen = document.getElementById("learnScreen");

const levelTitle = document.getElementById("levelTitle");
const questionWord = document.getElementById("questionWord");
const islInfo = document.getElementById("islInfo");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const saveBtn = document.getElementById("saveBtn");
const rightHand = document.getElementById("rightHand");
const progressDots = document.getElementById("progressDots");

/* =========================
   HOME BUTTONS
========================= */
document.getElementById("startBtn").onclick = () => {
  homeScreen.classList.remove("active");
  learnScreen.classList.add("active");
  loadQuestion();
};

document.getElementById("loadBtn").onclick = () => {
  const saved = JSON.parse(localStorage.getItem("isl-progress"));
  if (saved) {
    levelIndex = saved.levelIndex;
    questionIndex = saved.questionIndex;
    homeScreen.classList.remove("active");
    learnScreen.classList.add("active");
    loadQuestion();
  }
};

/* =========================
   CORE LOGIC
========================= */
function loadQuestion() {
  const level = LEVELS[levelIndex];
  const key = level.questions[questionIndex];
  const data = ISL_DICTIONARY[key];

  levelTitle.textContent = `Level ${levelIndex + 1}: ${level.name}`;
  questionWord.textContent = data.gloss;
  islInfo.textContent = `Handshape: ${data.handshape} • Location: ${data.location}`;
  feedback.textContent = "";
  nextBtn.disabled = true;
  optionsDiv.innerHTML = "";
  rightHand.className = "hand right";

  renderDots(level.questions.length);

  data.mcq.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index, data, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(index, data, btn) {
  if (!nextBtn.disabled) return;

  if (index === data.correctIndex) {
    feedback.textContent = "Correct! 🎉";
    correctSound.play();
    rightHand.classList.add("sign-known");
    nextBtn.disabled = false;
  } else {
    feedback.textContent = "Try again 💭";
    wrongSound.play();
    btn.classList.add("wrong");
  }
}

function renderDots(count) {
  progressDots.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === questionIndex) dot.classList.add("active");
    progressDots.appendChild(dot);
  }
}

/* =========================
   NAVIGATION + SAVE
========================= */
nextBtn.onclick = () => {
  questionIndex++;

  if (questionIndex >= LEVELS[levelIndex].questions.length) {
    levelIndex++;
    questionIndex = 0;

    if (levelIndex >= LEVELS.length) {
      questionWord.textContent = "DONE 🎉";
      optionsDiv.innerHTML = "";
      feedback.textContent = "You completed all levels!";
      nextBtn.style.display = "none";
      saveBtn.style.display = "none";
      return;
    }
  }
  loadQuestion();
};

saveBtn.onclick = () => {
  localStorage.setItem("isl-progress", JSON.stringify({
    levelIndex,
    questionIndex
  }));
  feedback.textContent = "Progress saved 💾";
};
