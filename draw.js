// canvas
let ctx;
let rows;
let columns;
let scale;
let startBtn = document.getElementById("startBtn");
let resizeBox = document.getElementById("resizeText");
let scaleBox = document.getElementById("scaleText");

// [small]  225px / 15 scale = 15 rows
// [normal] 300px / 15 scale = 20 rows
// [large]  375px / 15 scale = 25 rows
// [xlarge] 450px / 15 scale = 30 rows

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

const resizeCanvas = () => {
  // TODO: this needs to be a multiple of scale
  canvas.width = resizeBox.value;
  canvas.height = +resizeBox.value + sbHeight;
  preLoad();
}

const canvasSize = (preset) => {
  let size = 300;
  if (preset === "small") {
    size = 225;
  } else if (preset === "large") {
    size = 375;
  } else if (preset === "giant") {
    size = 450;
  }
  canvas.width = size;
  canvas.height = size + sbHeight;
  scale = 15;
  preLoad();
}

const preLoad = () => {
  // init canvas
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  scale = +scaleBox.value || 15;
  gameWidth = canvas.width;
  gameHeight = canvas.height - sbHeight;
  rows = gameWidth / scale;
  columns = gameHeight / scale;
  // window.addEventListener('resize', resizeCanvas, false);

  // init sprites
  snek = new Snek(2 * scale, 2 * scale);
  fruit = new Fruit();

  // init score
  score = 0;

  paint();
};

const initialize = () => {
  // hide startBtn
  startBtn.style.display = "none";

  // init sprites
  snek = new Snek(2 * scale, 2 * scale);
  fruit = new Fruit();
  fruit.pickLocation(snek);

  // init score
  score = 0;

  // paint canvas
  paint();

  // init frame
  interval = window.setInterval(paint, calculateSpeed(snek));
};

const paint = () => {
  // paint the scene
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fruit.draw();
  snek.update();
  snek.draw();

  // stop game and display game over if collision detected
  if (snek.checkCollision(gameHeight, gameWidth)) {
    clearInterval(interval);
    drawGameOver();
    startBtn.style.display = "";
  }

  // check for fruit collision
  if (snek.eat(fruit)) {
    fruit.pickLocation(snek);
    score++;
    clearInterval(interval);
    interval = window.setInterval(paint, calculateSpeed(snek));
  }

  drawScore();
}

const drawScore = () => {
  // divider for score
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, gameHeight + (sbHeight / 2));
  ctx.lineTo(gameWidth, gameHeight + (sbHeight / 2));
  ctx.strokeStyle = "white";
  ctx.stroke();

  // score
  ctx.font = "bold 20px sans";
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.fillText('Score: ' + score, 0, gameHeight + sbHeight - 10, gameWidth);
}

const drawGameOver = () => {
  ctx.beginPath();
  ctx.lineWidth = 26;
  ctx.moveTo(27, gameHeight / 2 - 47);
  ctx.lineTo(gameWidth - 27, gameHeight / 2 - 47);
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(30, gameHeight / 2 - 47);
  ctx.lineTo(gameWidth - 30, gameHeight / 2 - 47);
  ctx.strokeStyle = "white";
  ctx.stroke();

  ctx.font = "bold 20px sans";
  ctx.textAlign = "center";
  ctx.fillStyle = "red";
  ctx.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2 - 40);
}

const calculateSpeed = (snek) => {
  if (snek.tailLength < 15) {
    return 200;
  } else if (snek.tailLength < 30) {
    return 160;
  } else if (snek.tailLength < 50) {
    return 120;
  } else if (snek.tailLength < 75) {
    return 90;
  } else if (snek.tailLength < 100) {
    return 70;
  }
  return 50;
}

// read user input
window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '');
  snek.changeDirection(direction);
}));