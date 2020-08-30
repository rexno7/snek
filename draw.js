// milliseconds per frame (speed of snek)
let speed = 200;

// canvas
let ctx;
let rows;
let columns;
let scale;
let startBtn = document.getElementById("startBtn");

// sprites
let snek;
let fruit;

// frame interval
let interval;

const initialize = () => {
  // hide startBtn
  startBtn.style.display = "none";

  // init canvas
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  scale = 10;
  rows = canvas.height / scale;
  columns = canvas.width / scale;

  // init sprites
  snek = new Snek(2*scale, 2*scale);
  fruit = new Fruit();
  fruit.pickLocation();

  // paint canvas
  paint();

  // init frame
  interval = window.setInterval(paint, speed);
};

const paint = () => {
  // paint the scene
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fruit.draw();
  snek.update();

  // check for collision of game over condition
  if (snek.checkCollision()) {
    // stop game and display game over
    alert("GAME OVER");
    clearInterval(interval);

    // show start button
    startBtn.style.display = "";
  } else {
    snek.draw();
  }

  // check for fruit collision
  if (snek.eat(fruit)) {
    fruit.pickLocation();
  }

  // score
  // ctx.font = "bold 20px Open Sans";
  // ctx.textAlign = "center";
  // ctx.fillText('Score: 0000', 50, 50);
}

// read user input
window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '');
  snek.changeDirection(direction);
}));
