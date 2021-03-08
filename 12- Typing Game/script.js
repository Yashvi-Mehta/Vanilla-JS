const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
   'sigh',
   'tense',
   'airplane',
   'ball',
   'pies',
   'juice',
   'warlike',
   'bad',
   'north',
   'dependent',
   'steer',
   'silver',
   'highfalutin',
   'superficial',
   'quince',
   'eight',
   'feeble',
   'admit',
   'drag',
   'loving',
];
// Focus on text on start
text.focus();

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// initial difficulty
let difficulty = 'medium';

difficultySelect.value =
   localStorage.getItem('difficulty') !== null
      ? localStorage.getItem('difficulty')
      : 'medium';

// Generate random word from array
function getRandomWord() {
   return words[Math.floor(Math.random() * words.length)];
}
// Add word to DOM
function addWordToDOM() {
   randomWord = getRandomWord();
   word.innerHTML = randomWord;
   // settingsForm.value = difficulty;
}

// Update score
function updateScore() {
   score++;
   scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
   time--;
   timeEl.innerHTML = time + 's';

   if (time === 0) {
      clearInterval(timeInterval);
      // end game
      gameOver();
   }
}

// game over message
function gameOver() {
   endgameEl.innerHTML = `
   <h1>Time Ran out!</h1>
   <p>Your final score is ${score}</p>
   <button onclick="location.reload()">Restart Game</button>`;
   endgameEl.style.display = 'flex';
}

// Typing
text.addEventListener('input', (e) => {
   const insertedText = e.target.value;

   if (insertedText === randomWord) {
      addWordToDOM();
      //    to get a new word
      updateScore();

      // Clear
      e.target.value = '';

      if (difficulty === 'hard') {
         time += 2;
      } else if (difficulty === 'medium') {
         time += 3;
      } else {
         time += 5;
      }

      updateTime();
   }
});

// settings button click

settingsBtn.addEventListener('click', () => {
   settings.classList.toggle('hide');
});

// Settings select
settingsForm.addEventListener('change', (e) => {
   difficulty = e.target.value;
   localStorage.setItem('difficulty', difficulty);
});

addWordToDOM();
