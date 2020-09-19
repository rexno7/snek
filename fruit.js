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


    // const radius = scale / 2;

    // apple
    // ctx.beginPath();
    // ctx.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();

    // stem
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.moveTo(this.x + radius, this.y + (radius / 2));
    // ctx.lineTo(this.x + radius, this.y - (radius / 4));
    // ctx.strokeStyle = "tan";
    // ctx.stroke();

    // leaf
    // ctx.beginPath();
    // ctx.ellipse(this.x + scale - (radius / 2), this.y, radius / 2, radius / 4, 0, 0, 2 * Math.PI);
    // ctx.fillStyle = "limegreen";
    // ctx.fill();
  }
}