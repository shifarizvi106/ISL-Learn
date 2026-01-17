/* =========================
   SOUND EFFECTS
========================= */
const correctSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
const wrongSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");

/* =========================
   ISL DICTIONARY (ACCURATE)
========================= */
const ISL_DICTIONARY = {
  hello: {
    description: "Open hand wave",
    options: ["Wave", "Clap", "Point", "Thumbs up"]
  },
  thank_you: {
    description: "Hand from chin outward",
    options: ["Chin outward", "Wave", "Point", "Tap chest"]
  },
  water: {
    description: "W handshape at chin",
    options: ["W at chin", "Cup hand", "Point down", "Tap wrist"]
  }
};

/* =========================
   LEVEL STRUCTURE
========================= */
const LEVELS = [
  {
    name: "Greetings",
    questions: ["hello", "thank_you"]
  },
  {
    name: "Basics",
    questions: ["water"]
  }
];

/* =========================
   STATE
========================= */
let levelIndex = 0;
let questionIndex = 0;

/* =========================
   DOM REFERENCES
========================= */
const levelTitle = document.getElementById("levelTitle");
const questionWord = document.getElementById("questionWord");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const rightHand = document.getElementById("rightHand");
const progressDots = document.getElementById("progressDots");

/* =========================
   CORE FUNCTIONS
========================= */
function loadQuestion() {
  const level = LEVELS[levelIndex];
  const key = level.questions[questionIndex];
  const data = ISL_DICTIONARY[key];

  levelTitle.textContent = `Level ${levelIndex + 1}: ${level.name}`;
  questionWord.textContent = key.replace("_", " ").toUpperCase();
  feedback.textContent = "";
  nextBtn.disabled = true;
  optionsDiv.innerHTML = "";

  renderDots(level.questions.length);

  data.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, data.description, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(answer, correct, btn) {
  if (!nextBtn.disabled) return;

  if (answer.toLowerCase().includes(correct.split(" ")[0].toLowerCase())) {
    feedback.textContent = "Correct! 🎉";
    correctSound.play();
    rightHand.className = "hand right sign-known";
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
   NAVIGATION
========================= */
nextBtn.onclick = () => {
  rightHand.className = "hand right";
  questionIndex++;

  if (questionIndex >= LEVELS[levelIndex].questions.length) {
    levelIndex++;
    questionIndex = 0;

    if (levelIndex >= LEVELS.length) {
      questionWord.textContent = "ALL DONE 🎉";
      optionsDiv.innerHTML = "";
      feedback.textContent = "You completed all levels!";
      nextBtn.style.display = "none";
      return;
    }
  }

  loadQuestion();
};

/* =========================
   INIT
========================= */
loadQuestion();
