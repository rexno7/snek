function Snek(x, y) {
  this.x = x;
  this.y = y;
  this.xSpeed = 10;
  this.ySpeed = 0;
  this.tailLength = 0;
  this.tail = [];

  this.draw = () => {
    ctx.fillStyle = "#FFFFFF";

    for (let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = () => {
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    if (this.tailLength > 0) {
      this.tail[this.tailLength - 1] = { x: this.x, y: this.y };
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) {
      this.x = canvas.width - scale;
    } else if (this.x >= canvas.width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = canvas.height - scale;
    } else if (this.y >= canvas.height) {
      this.y = 0;
    }
  }

  this.changeDirection = (direction) => {
    switch (direction) {
      case 'Up':
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case 'Down':
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case 'Left':
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case 'Right':
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  };

  this.eat = (fruit) => {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.tail.push({ x: this.x, y: this.y });
      this.tailLength++;
      return true;
    }
    return false;
  }

  this.checkCollision = () => {
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
