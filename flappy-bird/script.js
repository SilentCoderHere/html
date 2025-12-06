const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.querySelector('.score-display');
const startScreen = document.querySelector('.start-screen');
const gameOverScreen = document.querySelector('.game-over');
const finalScoreDisplay = document.getElementById('finalScore');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

let gameRunning = false;
let score = 0;
let frames = 0;

const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 34,
  height: 24,
  gravity: 0.5,
  velocity: 0,
  jump: -10,
  
  draw: function() {
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x + 8, this.y - 3, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FF6B35';
    ctx.beginPath();
    ctx.moveTo(this.x + 15, this.y);
    ctx.lineTo(this.x + 30, this.y);
    ctx.lineTo(this.x + 15, this.y + 8);
    ctx.fill();
    
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(this.x - 5, this.y + 5, 10, 6, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
  },
  
  update: function() {
    if (gameRunning) {
      this.velocity += this.gravity;
      this.y += this.velocity;
      
      if (this.y + this.height/2 >= canvas.height - ground.height) {
        this.y = canvas.height - ground.height - this.height/2;
        if (gameRunning) gameOver();
      }
      
      if (this.y - this.height/2 <= 0) {
        this.y = this.height/2;
        this.velocity = 0;
      }
    }
  },
  
  flap: function() {
    this.velocity = this.jump;
  },
  
  reset: function() {
    this.y = canvas.height / 2;
    this.velocity = 0;
  }
};

const ground = {
  height: 80,
  
  draw: function() {
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(0, canvas.height - this.height, canvas.width, this.height);
    
    ctx.fillStyle = '#2E8B57';
    ctx.fillRect(0, canvas.height - this.height, canvas.width, 15);
    
    ctx.fillStyle = '#8B4513';
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.fillRect(i, canvas.height - 20, 15, 5);
    }
  }
};

const pipes = {
  position: [],
  gap: 180,
  maxYPos: -150,
  dx: 2,
  
  draw: function() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      
      ctx.fillStyle = '#2E8B57';
      ctx.fillRect(p.x, p.y, p.width, p.height);
      
      ctx.fillStyle = '#228B22';
      ctx.fillRect(p.x - 5, p.y + p.height - 20, p.width + 10, 20);
      
      ctx.fillStyle = '#2E8B57';
      ctx.fillRect(p.x, p.y + p.height + this.gap, p.width, canvas.height);
      
      ctx.fillStyle = '#228B22';
      ctx.fillRect(p.x - 5, p.y + p.height + this.gap, p.width + 10, 20);
    }
  },
  
  update: function() {
    if (gameRunning) {
      if (frames % 100 === 0) {
        this.position.push({
          x: canvas.width,
          y: this.maxYPos * (Math.random() + 1),
          width: 60,
          height: 300
        });
      }
      
      for (let i = 0; i < this.position.length; i++) {
        let p = this.position[i];
        
        p.x -= this.dx;
        
        if (p.x + p.width <= 0) {
          this.position.shift();
          score++;
          scoreDisplay.textContent = score;
        }
        
        if (
          bird.x + bird.width/2 > p.x && 
          bird.x - bird.width/2 < p.x + p.width && 
          bird.y - bird.height/2 < p.y + p.height
        ) {
          gameOver();
        }
        
        if (
          bird.x + bird.width/2 > p.x && 
          bird.x - bird.width/2 < p.x + p.width && 
          bird.y + bird.height/2 > p.y + p.height + this.gap
        ) {
          gameOver();
        }
      }
    }
  },
  
  reset: function() {
    this.position = [];
  }
};

const background = {
  draw: function() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(100, 80, 30, 0, Math.PI * 2);
    ctx.arc(130, 70, 35, 0, Math.PI * 2);
    ctx.arc(160, 80, 25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(300, 120, 30, 0, Math.PI * 2);
    ctx.arc(330, 110, 35, 0, Math.PI * 2);
    ctx.arc(360, 120, 25, 0, Math.PI * 2);
    ctx.fill();
  }
};

function draw() {
  background.draw();
  pipes.draw();
  ground.draw();
  bird.draw();
}

function update() {
  bird.update();
  pipes.update();
}

function gameLoop() {
  update();
  draw();
  frames++;
  
  requestAnimationFrame(gameLoop);
}

function startGame() {
  gameRunning = true;
  score = 0;
  frames = 0;
  scoreDisplay.textContent = score;
  bird.reset();
  pipes.reset();
  startScreen.style.display = 'none';
  gameOverScreen.style.display = 'none';
}

function gameOver() {
  gameRunning = false;
  finalScoreDisplay.textContent = score;
  gameOverScreen.style.display = 'block';
}

document.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    if (!gameRunning && gameOverScreen.style.display === 'block') {
      startGame();
    } else if (gameRunning) {
      bird.flap();
    }
  }
});

canvas.addEventListener('click', function() {
  if (!gameRunning && gameOverScreen.style.display === 'block') {
    startGame();
  } else if (gameRunning) {
    bird.flap();
  }
});

canvas.addEventListener('touchstart', function(e) {
  if (!gameRunning && gameOverScreen.style.display === 'block') {
    startGame();
  } else if (gameRunning) {
    bird.flap();
  }
  e.preventDefault();
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

draw();
gameLoop();