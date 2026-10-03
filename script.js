
const nameInput = document.getElementById('username');
const nextBtn = document.getElementById('btn-next-step');
const trashBin = document.getElementById('trash-bin');
const inputWrapper = document.querySelector('.input-wrapper');

const stepName = document.getElementById('step-name');
const stepQuestions = document.getElementById('step-questions');
const stepFinal = document.getElementById('step-final');

const questionText = document.getElementById('question-text');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

let currentQuestion = 0;
let userName = "";

const questions = [
 "Признаешь ли ты, что ты не прав?",
  "Ты перстанешь меня игнорировать?",
  "Ты будешь покупать мне йогурты и прочии необходиости в школу?"
];

// 1. Проверка ввода имени
nameInput.addEventListener('input', () => {
  const value = nameInput.value;
  nextBtn.disabled = value.trim().length === 0;

  if (value.length > 5) {
    const extraChar = value.slice(-1);
    nameInput.value = value.slice(0, 5);
    animateFallingLetter(extraChar);
  }
});

function animateFallingLetter(char) {
  const letterEl = document.createElement('span');
  letterEl.className = 'falling-letter';
  letterEl.textContent = char;
  letterEl.style.right = '20px';
  letterEl.style.top = '10px';

  inputWrapper.appendChild(letterEl);
  trashBin.classList.add('bounce');
  setTimeout(() => trashBin.classList.remove('bounce'), 300);
  setTimeout(() => letterEl.remove(), 600);
}

// 2. Переход к вопросам
nextBtn.addEventListener('click', () => {
  userName = nameInput.value.trim();
  stepName.classList.add('hidden');
  stepQuestions.classList.remove('hidden');
  showQuestion();
});

function showQuestion() {
  questionText.textContent = `${userName}, ${questions[currentQuestion].toLowerCase()}`;
  resetNoButton();
}

function resetNoButton() {
  btnNo.style.position = 'static';
}

// 3. Убегание кнопки НЕТ
function moveNoButton() {
  btnNo.style.position = 'fixed';
  
  const maxX = window.innerWidth - btnNo.offsetWidth - 20;
  const maxY = window.innerHeight - btnNo.offsetHeight - 20;

  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  btnNo.style.left = `${randomX}px`;
  btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('mouseenter', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});

btnNo.addEventListener('click', () => {
  alert("Кнопка «Нет» ушла за молоком 🥛");
  moveNoButton();
});

// 4. Нажатие на ДА -> Финал
btnYes.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    // Переход на финишный экран
    stepQuestions.classList.add('hidden');
    stepFinal.classList.remove('hidden');
  }
});