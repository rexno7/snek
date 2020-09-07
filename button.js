function Button(text, x, y, width, height, clickable, color = "green") {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.clickable = clickable;

  this.draw = () => {
    ctx.beginPath();
    ctx.lineWidth = this.height;
    ctx.moveTo(x - this.width / 2, y);
    ctx.lineTo(x + this.width / 2, y);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.lineWidth = this.height - 6;
    ctx.beginPath();
    ctx.moveTo(x - this.width / 2 + 3, y);
    ctx.lineTo(x + this.width / 2 - 3, y);
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.font = "bold 20px sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(text, this.x, this.y);
  }

  this.isClicked = (x, y) => {
    if (
      this.clickable &&
      x >= this.x - this.width / 2 &&
      x < this.x + this.width / 2 &&
      y >= this.y - this.height / 2 &&
      y < this.y + this.height / 2
    ) {
      return true;
    }
    return false;
  }
}