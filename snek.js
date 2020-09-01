function Snek(x, y) {
  this.x = x;
  this.y = y;
  this.xSpeed = 10;
  this.ySpeed = 0;
  this.tailLength = 0;
  this.tail = [];

  this.draw = () => {
    ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = () => {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.tailLength > 0) {
      this.tail[this.tailLength - 1] = {
        x: this.x,
        y: this.y
      };
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  this.changeDirection = (direction) => {
    let oppositeDirection;
    if (this.xSpeed > 0) {
      oppositeDirection = 'Left';
    } else if (this.xSpeed < 0) {
      oppositeDirection = 'Right';
    } else if (this.ySpeed > 0) {
      oppositeDirection = 'Up';
    } else {
      oppositeDirection = 'Down'
    }

    switch (direction) {
    case 'Up':
      if (direction !== oppositeDirection) {
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
      }
      break;
    case 'Down':
      if (direction !== oppositeDirection) {
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
      }
      break;
    case 'Left':
      if (direction !== oppositeDirection) {
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
      }
      break;
    case 'Right':
      if (direction !== oppositeDirection) {
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
      }
      break;
    }
  };

  this.eat = (fruit) => {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.tail.push({
        x: this.x,
        y: this.y
      });
      this.tailLength++;
      return true;
    }
    return false;
  }

  this.checkCollision = (gameHeight, gameWidth) => {
    // check that the snek hasn't left the game area
    if (this.x < 0 || this.x >= gameWidth || this.y < 0 || this.y >= gameWidth) {
      return true;
    }

    // check that the snek didn't run into it's tail
    for (tail of this.tail) {
      if (this.x === tail.x && this.y === tail.y) {
        this.tail = [];
        this.tailLength = 0;
        return true;
      }
    }
    return false;
  };

}