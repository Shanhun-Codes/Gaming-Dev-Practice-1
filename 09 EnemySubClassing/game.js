document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const canvasWidth = (canvas.width = 500);
  const canvasHeight = (canvas.height = 800);

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.height = height;
      this.width = width;
      this.enemies = [];
      this.enemyInterval = 500;
      this.enemyTimer = 0;
      this.enemyTypes = ["worm", "ghost", "spider"];
    }
    update(deltaTime) {
      this.enemies = this.enemies.filter((object) => !object.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((object) => object.update(deltaTime));
    }
    draw() {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    #addNewEnemy() {
      const randomEnemy =
        this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
      if (randomEnemy == "worm") {
        this.enemies.push(new Worm(this));
      }
      if (randomEnemy == "ghost") {
        this.enemies.push(new Ghost(this));
      }
      if (randomEnemy == "spider") {
        this.enemies.push(new Spider(this));
      }
      //   this.enemies.sort((a, b) => a.y - b.y);
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;
      this.frameX;
      this.maxFrame = 5;
      this.frameInterval = 100;
      this.frameTimer = 0;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;
      if (this.x < 0 - this.game.width) this.markedForDeletion = true;
      if (this.frameTimer > this.frameInterval) {
        if ( this.frameX < this.maxFrame) this.frameX++
        else this.frameX = 0
        this.frameTimer = 0
        }
       else {
        this.frameTimer += deltaTime;
      }
    }
    draw(ctx) {
      ctx.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
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

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 80;
      this.spriteHeight = 60;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = this.game.width;
      this.y = this.game.height - this.height;
      this.image = worm;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 88;
      this.spriteHeight = 70;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height * 0.6;
      this.image = ghost;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.05;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = 0.5;
      super.draw(ctx);
      ctx.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 120;
      this.spriteHeight = 144;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = Math.random() * this.game.width * 2;
      this.y = 0 - this.height;
      this.image = spider;
      this.vx = 0;
      this.vy = 0.1;
      this.maxLength = Math.random() * this.game.height - this.spriteHeight;
    }
    update(deltaTime) {
        if (this.y < 0 - this.spriteHeight * 2) {
            this.markedForDeletion = true
        }
      super.update(deltaTime);
      this.y += this.vy * deltaTime;
      if (this.y > this.maxLength) this.vy += -0.8;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.spriteWidth / 2, 0);
      ctx.lineTo(this.x + this.spriteWidth / 2, this.y + 50);
      ctx.stroke();
      super.draw(ctx);
    }
  }

  const game = new Game(ctx, canvasWidth, canvasHeight);
  let lastTime = 1;
  const animate = (timeStamp) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // check time between frames. "deltaTime"
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  };
  animate(0);
});
