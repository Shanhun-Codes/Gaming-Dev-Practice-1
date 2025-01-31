/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 500;
const canvasHeight = canvas.height = 1000;
const numberOfEnemies = 100;
const enemyArray = [];
let gameFrame = 0

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = 'enemy1.png'
    this.spriteWidth = 293;
    this.spriteHeight = 155
    this.height = this.spriteHeight / 4;
    this.width = this.spriteWidth / 4;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3) + 1
  }
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed === 0) {
        this.frame > 4 ? this.frame = 0 : this.frame++
    }
  }
  draw() {
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemyArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  enemyArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++
  requestAnimationFrame(animate);
}
animate();
