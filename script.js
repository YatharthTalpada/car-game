const player = document.getElementById("player");
const enemy1 = document.getElementById("enemy1");
const enemy2 = document.getElementById("enemy2");
const scoreDisplay = document.getElementById("score");
const crashSound = document.getElementById("crash-sound");

let playerPos = 175;
let speed = 4;
let score = 0;
let gameRunning = true;

// Move player with keyboard
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 10;
  } else if (e.key === "ArrowRight" && playerPos < 350) {
    playerPos += 10;
  }
  player.style.left = playerPos + "px";
});

// Mobile controls
document.getElementById("left-btn").addEventListener("click", () => {
  if (playerPos > 0) {
    playerPos -= 10;
    player.style.left = playerPos + "px";
  }
});

document.getElementById("right-btn").addEventListener("click", () => {
  if (playerPos < 350) {
    playerPos += 10;
    player.style.left = playerPos + "px";
  }
});

// Move enemies
function moveEnemy(enemy) {
  let enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));

  if (enemyTop >= 600) {
    enemyTop = -120;
    enemy.style.left = Math.floor(Math.random() * 350) + "px";
    score += 1;
    scoreDisplay.innerText = "Score: " + score;
  } else {
    enemyTop += speed;
  }

  enemy.style.top = enemyTop + "px";
}

// Collision
function detectCollision() {
  const playerRect = player.getBoundingClientRect();
  const enemies = [enemy1, enemy2];

  for (let enemy of enemies) {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      crashSound.play();
      alert("💥 Game Over! Your Score: " + score);
      gameRunning = false;
      window.location.reload();
    }
  }
}

// Game loop
function gameLoop() {
  if (!gameRunning) return;
  moveEnemy(enemy1);
  moveEnemy(enemy2);
  detectCollision();
  requestAnimationFrame(gameLoop);
}

gameLoop();
