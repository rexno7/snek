function Fruit() {
  this.x;
  this.y;

  // TODO: make this less complex
  this.pickLocation = (snek) => {
    let occupied;
    do {
      occupied = false;
      this.x = Math.floor(Math.random() * rows) * scale;
      this.y = Math.floor(Math.random() * columns) * scale;
      if (snek.x === this.x && snek.y === this.y) {
        occupied = true;
        continue;
      }
      for (i = 0; i < snek.tail.length; i++) {
        if (snek.tail[i].x === this.x && snek.tail[i].y === this.y) {
          occupied = true;
          break;
        }
      }
    } while (occupied);
  };

  this.draw = () => {
    ctx.drawImage(apple, this.x, this.y, scale, scale);
  }
}