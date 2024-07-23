<!--Definicion de variables/constantes--!>
document.addEventListener('keydown', keyPressed);
const loseCard=document.querySelector('.card');
const txtScore=document.querySelector('.txtScore');
const restartButton=document.querySelector('.restar');
restartButton.addEventListener("click",function(){
  loseCard.style.display='none';});
let vlc=140;
let chanceV1=1;
let chanceV2=2;
let canvas = document.getElementById('snakeGame');
let scoreDisplay = document.getElementById('snakeGameScore');
let highestScoreDisplay = document.getElementById('snakeGameHighestScore');
let c = canvas.getContext('2d');
const cell = 40;
const rows = 14;
const cols = 14;
  <!--Dimensiones del canvas--!>
canvas.height = rows * cell;
canvas.width = cols * cell;
const comer=new Audio("comer.mp3");
const gameOver=new Audio("over.mp3");
gameOver.playbackRate = 5;

let dir = {
  x: 0,
  y: 0
};
<!--Posicion inicial de la serpiente--!>
let snakeInitial = {
  x: rows * cell / 2,
  y: cols * cell / 2
};
<!--Largo inicial--!>
let tail = [];
for (let i = 0; i < 3; i++) {
  tail.push({
    x: snakeInitial.x - i * cell,
    y: snakeInitial.y
  });
}
<!--Crear la comida--!>
let food = {
  x: snakeInitial.x + 2 * cell,
  y: snakeInitial.y
};
let score = 0;
let highestScore = 0;
let start = true;

function play() {
  setTimeout(() => {
    if (tail[0].x < 0 || tail[0].x === canvas.width || tail[0].y < 0 || tail[0].y === canvas.height) {
      tail = [];
      lose();
      for (let i = 0; i < 3; i++) {
        tail.push({
          x: snakeInitial.x - i * cell,
          y: snakeInitial.y
        });
      }
      dir = {
        x: 0,
        y: 0
      };
      score = 0;
      start = true;
      while (inTail(food)) {
        food = {
          x: Math.floor(Math.random() * cols) * cell,
          y: Math.floor(Math.random() * rows) * cell
        };
      }
    }
    <!--Verificar coliciones--!>
      if (check(tail[0].x, tail[0].y)) {
        for (let i = 0; i < score; i++) {
          tail.pop();
        }
        score = 0;  
      }
    <!--Incremento al comer--!>
    if (tail[0].x === food.x && tail[0].y === food.y) {
      score++;
      comer.play();
      tail.push({
        x: tail[tail.length - 1].x,
        y: tail[tail.length - 1].y
      });
      
      while (inTail(food)) {
        food = {
          x: Math.floor(Math.random() * cols) * cell,
          y: Math.floor(Math.random() * rows) * cell
        };
      }
    }
    if (!(dir.x === 0 && dir.y === 0))
      for (let t = tail.length - 1; t > 0; t--) {
        tail[t].x = tail[t - 1].x;
        tail[t].y = tail[t - 1].y;
        start = false;
        
      }
      
      
    tail[0].x += dir.x;
    tail[0].y += dir.y;
    <!--Crea las dimensiones del canvas en cuadrados--!>
  
    c.clearRect(0, 0, canvas.width, canvas.height);
      
    c.fillStyle = 'rgb(30,30,30)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = 'rgb(250, 29, 29 )';
    c.fillRect(food.x + 1, food.y + 1, cell - 2, cell - 2);
      
    <!--Crear cada uno de los cuadros de la serpiente--!>
    for (let t in tail) {
      c.fillStyle = '#f5f5f5';
      c.fillRect(tail[t].x + 1, tail[t].y + 1, cell - 2, cell - 2);
    }
    <!--Ingremento de highestcore--!>
    scoreDisplay.innerHTML = `Score: ${score}`;
    if (highestScore < score)
      highestScore = score;
    highestScoreDisplay.innerHTML = `Highest score: ${highestScore}`;  
    requestAnimationFrame(play);
  }, vlc);
}
requestAnimationFrame(play);

function inTail(food) {
  for (let t in tail) {
    if (food.x === tail[t].x && food.y === tail[t].y) {
      return true;
    }
  }
  return false;
}
<!--Verificar las coliciones--!>
function check(x, y) {
  for (let i = 2; i < tail.length; i++) {
    if (x === tail[i].x && y === tail[i].y) {
      return true;
    }
  }
  <!--Incremento de volicidad dependiendo el puntaje--!>
  if(chanceV1==1){
    if(score==10){
      vlc=vlc-20;
      chanceV1=2;
      chanceV2=1
    }
  }
  if(chanceV2==1){
    if(score==20){
      vlc=vlc-20;
      chanceV2=2
    }
  }
  return false;
}
<!--Funcion inicio y direccion--!>
function keyPressed(e) {
  switch (e.keyCode) {
      <!--Izquierda--!>
    case 37:
      if (!start && dir.x !== cell)
        dir = {
          x: -cell,
          y: 0
        };
      break;
      <!--Arriba--!>
    case 38:
      e.preventDefault();
      if (dir.y !== cell)
        dir = {
          x: 0,
          y: -cell
        };
      break;
      <!--Derecha--!>
    case 39:
      if (dir.x !== -cell)
        dir = {
          x: cell,
          y: 0
        };
      break;
      <!--Abajo--!>
    case 40:
      e.preventDefault();
      if (dir.y !== -cell)
        dir = {
          x: 0,
          y: cell
        };
      break;
  }
}
function lose(){
  gameOver.play()
  txtScore.textContent = `${score}`;
  loseCard.style.display='block'; 
  
}
function lose(){
  gameOver.play()
  txtScore.textContent = ${score};
  loseCard.style.display='block'; 
  
}
