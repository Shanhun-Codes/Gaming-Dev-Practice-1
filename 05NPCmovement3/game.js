/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 1000);
const numberOfEnemies = 10;
const enemyArray = [];
let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy3.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.height = this.spriteHeight / 4;
    this.width = this.spriteWidth / 4;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 0.5 + 0.5
    // this.curve = Math.random() * 200 + 50
  }
  update() {
    this.x = canvas.width/2 * Math.cos(this.angle * Math.PI/200) + (canvasWidth/2 - this.width/2)
    this.y = canvas.height/2 * Math.sin(this.angle * Math.PI/300) + (canvasHeight/2 - this.height/2)
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
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
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
