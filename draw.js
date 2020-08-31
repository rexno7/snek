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

// score board
let score;
let sbHeight = 30;

// game area
let gameHeight;
let gameWidth;

const initialize = () => {
  // hide startBtn
  startBtn.style.display = "none";

  // init canvas
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  scale = 10;
  gameWidth = canvas.width;
  gameHeight = canvas.height - sbHeight;
  rows = gameWidth / scale;
  columns = gameHeight / scale;

  // init sprites
  snek = new Snek(0, 0);
  fruit = new Fruit();
  fruit.pickLocation();

  // init score
  score = 0;

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
    score++;
  }

  drawScore();
}

const drawScore = () => {
  // divider for score
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, 215);
  ctx.lineTo(200, 215);
  ctx.strokeStyle = "white";
  ctx.stroke();

  // score
  ctx.font = "bold 20px Sans red";
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.fillText('Score: ' + score, 0, 220, 200);
}

// read user input
window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '');
  snek.changeDirection(direction);
}));