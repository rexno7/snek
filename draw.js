// milliseconds per frame (speed of snek)
let speed = 200;

// canvas
let ctx;
let rows;
let columns;
let scale;

// sprites
let snek;
let fruit;

// frame interval
let interval;

const initialize = () => {
  console.log("init");
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

  // check for collision and draw snek
  if (snek.checkCollision()) {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval);
  } else {
    snek.draw();
  }

  // check for fruit collision
  if (snek.eat(fruit)) {
    fruit.pickLocation();
  }
}

// read user input
window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '');
  snek.changeDirection(direction);
}));
