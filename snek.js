function Snek(x, y) {
  this.x = x;
  this.y = y;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.tailLength = 0;
  this.tail = [];

  this.draw = () => {
    ctx.fillStyle = "limegreen";

    let tailPrev = {
      x: this.x,
      y: this.y
    };
    for (let i = this.tail.length - 1; i >= 0; i--) {
      ctx.save();
      const translateX = this.tail[i].x + scale / 2;
      const translateY = this.tail[i].y + scale / 2;
      let body = snek_body;
      const flipX = Math.PI * ((this.x / scale) % 2);
      const flipY = Math.PI * ((this.y / scale) % 2);
      ctx.translate(translateX, translateY);
      if (tailPrev.x === this.tail[i].x && tailPrev.y > this.tail[i].y) {
        // down 90
        if (i - 1 >= 0 && this.tail[i].x !== this.tail[i - 1].x) {
          body = snek_body_corner;
          if (this.tail[i].x > this.tail[i - 1].x) {
            //no rotation
          } else {
            ctx.rotate(3 * Math.PI / 2);
          }
        } else {
          ctx.rotate((Math.PI / 2) + flipY);
        }
      } else if (tailPrev.x > this.tail[i].x && tailPrev.y === this.tail[i].y) {
        // right 180
        if (i - 1 >= 0 && this.tail[i].y !== this.tail[i - 1].y) {
          body = snek_body_corner;
          if (this.tail[i].y > this.tail[i - 1].y) {
            ctx.rotate(Math.PI);
          } else {
            ctx.rotate(3 * Math.PI / 2);
          }
        } else {
          ctx.rotate(flipX);
        }
      } else if (tailPrev.x === this.tail[i].x && tailPrev.y < this.tail[i].y) {
        // up 270
        if (i - 1 >= 0 && this.tail[i].x !== this.tail[i - 1].x) {
          body = snek_body_corner;
          if (this.tail[i].x > this.tail[i - 1].x) {
            ctx.rotate(Math.PI / 2);
          } else {
            ctx.rotate(Math.PI);
          }
        } else {
          ctx.rotate((3 * Math.PI / 2) + flipY);
        }
      } else {
        // left 0 / 360
        if (i - 1 >= 0 && this.tail[i].y !== this.tail[i - 1].y) {
          body = snek_body_corner;
          if (this.tail[i].y > this.tail[i - 1].y) {
            ctx.rotate(Math.PI / 2);
          } else {
            // no rotation
          }
        } else {
          ctx.rotate(Math.PI + flipX);
        }
      }
      ctx.drawImage(body, 0 - scale / 2, 0 - scale / 2, scale, scale);
      ctx.restore();

      tailPrev = {
        x: this.tail[i].x,
        y: this.tail[i].y
      };
    }

    drawSnekHead();
  }

  drawSnekHead = () => {
    // draw circle for head
    ctx.beginPath();
    ctx.arc(this.x + scale / 2, this.y + scale / 2, scale / 2, 0, 2 * Math.PI);
    ctx.fill();

    // fill back half of block to connect to tail
    if (this.xSpeed > 0) {
      ctx.fillRect(this.x, this.y, scale / 2, scale);
    } else if (this.xSpeed < 0) {
      ctx.fillRect(this.x + scale / 2, this.y, scale / 2, scale);
    } else if (this.ySpeed > 0) {
      ctx.fillRect(this.x, this.y, scale, scale / 2);
    } else {
      ctx.fillRect(this.x, this.y + scale / 2, scale, scale / 2);
    }
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

  this.getDirection = () => {
    if (this.xSpeed > 0) {
      return 'Right';
    } else if (this.xSpeed < 0) {
      return 'Left';
    } else if (this.ySpeed > 0) {
      return 'Down';
    } else {
      return 'Up'
    }
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

  const printTail = () => {
    let tailString = "";
    tailString += `head:(${this.x},${this.y}), `;
    for (let i = this.tail.length - 1; i >= 0; i--) {
      tailString += `${i}:(${this.tail[i].x},${this.tail[i].y}), `;
    }
    console.log(tailString);
  }

}