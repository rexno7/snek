function Fruit() {
  this.x;
  this.y;

  this.pickLocation = () => {
    //this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    //this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    this.x = Math.floor(Math.random() * rows) * scale;
    this.y = Math.floor(Math.random() * columns) * scale;
  };

  this.draw = () => {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}
