const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const startBtn = document.getElementById("startBtn")
let speed = 200;

let snek;

(function setup() {
  snek = new Snek(2*scale, 2*scale);
  fruit = new Fruit();

  fruit.pickLocation();

  let id = window.setInterval(frame, speed);

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snek.update();
    if (snek.checkCollision()) {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(id);
    } else {
      snek.draw();
    }

    if (snek.eat(fruit)) {
      fruit.pickLocation();
    }

    if (snek.tailLength === 0) {
      speed = 200;
      clearInterval(id);
      id = window.setInterval(frame, speed);
    } else if (snek.tailLength === 10) {
      speed = 150;
      clearInterval(id);
      id = window.setInterval(frame, speed);
    } else if (snek.tailLength === 20) {
      speed = 110;
      clearInterval(id);
      id = window.setInterval(frame, speed);
    } else if (snek.tailLength === 30) {
      speed = 80;
      clearInterval(id);
      id = window.setInterval(frame, speed);
    } else if (snek.tailLength === 40) {
      speed = 55;
      clearInterval(id);
      id = window.setInterval(frame, speed);
    } else if (snek.tailLength === 50) {
      speed = 40;
      clearInterval(id);
      id = window.setInterval(frame, speed);
    }
  };
}());

window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '');
  snek.changeDirection(direction);
}));
