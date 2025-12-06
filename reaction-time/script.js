const target = document.getElementById('target');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const result = document.getElementById('result');
const currentTime = document.getElementById('currentTime');
const bestTime = document.getElementById('bestTime');
const averageTime = document.getElementById('averageTime');
const historyList = document.getElementById('historyList');
const particlesContainer = document.getElementById('particles');

function createParticles() {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    const animationDuration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
}

function createConfetti() {
  const colors = ['#ff7e5f', '#feb47b', '#6a11cb', '#2575fc', '#4CAF50', '#FFC107', '#F44336'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = color;
    
    const size = Math.random() * 10 + 5;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

const gameState = {
  IDLE: 'idle',
  WAITING: 'waiting',
  ACTIVE: 'active',
  FINISHED: 'finished'
};

let state = gameState.IDLE;
let startTime;
let timeoutId;
let reactionTimes = [];
let bestReactionTime = Infinity;

function initializeGame() {
  if (localStorage.getItem('reactionTimes')) {
    reactionTimes = JSON.parse(localStorage.getItem('reactionTimes'));
    updateStats();
  }
  if (localStorage.getItem('bestReactionTime')) {
    bestReactionTime = parseInt(localStorage.getItem('bestReactionTime'));
    bestTime.textContent = bestReactionTime + ' ms';
  }
  updateHistoryDisplay();
  createParticles();
}

function startGame() {
  if (state !== gameState.IDLE) return;
  state = gameState.WAITING;
  startBtn.disabled = true;
  result.textContent = '';
  target.textContent = 'Wait...';
  target.classList.remove('active', 'too-soon', 'success');
  target.classList.add('waiting');
  
  const delay = Math.random() * 4000 + 1000;
  timeoutId = setTimeout(() => {
    if (state === gameState.WAITING) {
      state = gameState.ACTIVE;
      target.textContent = 'Click Now!';
      target.classList.remove('waiting');
      target.classList.add('active');
      startTime = Date.now();
    }
  }, delay);
}

function handleTargetClick() {
  switch (state) {
    case gameState.IDLE:
      startGame();
      break;

    case gameState.WAITING:
      state = gameState.FINISHED;
      clearTimeout(timeoutId);
      target.textContent = 'Too Soon!';
      target.classList.remove('waiting');
      target.classList.add('too-soon');
      result.textContent = 'You clicked too early! Wait for green.';
      result.className = 'result slow';

      setTimeout(resetGame, 1500);
      break;

    case gameState.ACTIVE:
      const endTime = Date.now();
      const reactionTime = endTime - startTime;

      target.textContent = reactionTime + ' ms';
      target.classList.remove('active');
      target.classList.add('success');
      
      if (reactionTime < 250) {
        createConfetti();
      }
      processResult(reactionTime);
      break;

    case gameState.FINISHED:
      break;
  }
}

function processResult(reactionTime) {
  state = gameState.FINISHED;

  reactionTimes.push(reactionTime);

  if (reactionTime < bestReactionTime) {
    bestReactionTime = reactionTime;
    localStorage.setItem('bestReactionTime', bestReactionTime.toString());
  }

  localStorage.setItem('reactionTimes', JSON.stringify(reactionTimes));

  updateStats();
  displayResult(reactionTime);
  addToHistory(reactionTime);

  setTimeout(resetGame, 2000);
}

function resetGame() {
  state = gameState.IDLE;
  startTime = null;
  target.textContent = 'Click to Start';
  target.classList.remove('active', 'waiting', 'too-soon', 'success');
  startBtn.disabled = false;
}

function updateStats() {
  if (reactionTimes.length > 0) {
    const current = reactionTimes[reactionTimes.length - 1];
    currentTime.textContent = current + ' ms';

    const sum = reactionTimes.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / reactionTimes.length);
    averageTime.textContent = average + ' ms';

    bestTime.textContent = bestReactionTime + ' ms';
  }
}

function displayResult(time) {
  result.textContent = `Reaction time: ${time} ms`;
  if (time < 200) {
    result.className = 'result fast';
    result.textContent += ' - Incredible!';
  } else if (time < 300) {
    result.className = 'result fast';
    result.textContent += ' - Very Fast!';
  } else if (time < 400) {
    result.className = 'result medium';
    result.textContent += ' - Good!';
  } else if (time < 500) {
    result.className = 'result medium';
    result.textContent += ' - Average';
  } else {
    result.className = 'result slow';
    result.textContent += ' - A bit slow';
  }
}

function addToHistory(time) {
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';
  historyItem.textContent = time + ' ms';

  if (time < 200) {
    historyItem.style.background = 'rgba(76, 175, 80, 0.3)';
  } else if (time < 300) {
    historyItem.style.background = 'rgba(139, 195, 74, 0.3)';
  } else if (time < 400) {
    historyItem.style.background = 'rgba(255, 193, 7, 0.3)';
  } else if (time < 500) {
    historyItem.style.background = 'rgba(255, 152, 0, 0.3)';
  } else {
    historyItem.style.background = 'rgba(244, 67, 54, 0.3)';
  }
  historyList.appendChild(historyItem);

  while (historyList.children.length > 10) {
    historyList.removeChild(historyList.firstChild);
  }
}

function updateHistoryDisplay() {
  historyList.innerHTML = '';
  reactionTimes.slice(-10).forEach(time => addToHistory(time));
}

function resetStats() {
  reactionTimes = [];
  bestReactionTime = Infinity;
  localStorage.removeItem('reactionTimes');
  localStorage.removeItem('bestReactionTime');
  currentTime.textContent = '0 ms';
  bestTime.textContent = '0 ms';
  averageTime.textContent = '0 ms';
  result.textContent = '';
  historyList.innerHTML = '';

  if (state !== gameState.IDLE) {
    resetGame();
  }
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetStats);
target.addEventListener('click', handleTargetClick);

target.addEventListener('touchstart', function (e) {
  e.preventDefault();
  handleTargetClick();
});

document.addEventListener('touchstart', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (e) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

initializeGame();