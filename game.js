//Variable que almacena la etiqueta canvas
const canvas = document.querySelector("#game");
//Creación del espacio de juego, en este caso 2d
const game = canvas.getContext("2d");
//Variables para los botones
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

//Variables globales.
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

//Creamos variables de la posición del jugador y regalo las cuales sera un objeto.
const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

//Cargar el canvas luego de haberse cargado el HTML completo
window.addEventListener("load", setcanvasSize);
window.addEventListener("resize", setcanvasSize);

function setcanvasSize() {
  //Realizamos validacion para que las medidas del canvas se ajusten segun los tamaños
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  //llamamos la funcion para renderizar el mapa.
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  ///*** Creamos las variables para acceder a los elemntos desde las posiciones ***///

  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }

  //Creamos la variable de las filas del mapa y Limpiamos el string con el metodo ".trim()" y creamos un nuevo arreglo a partir del string con ".split()"
  const mapRows = map.trim().split("\n");
  //Creamos un nuevo array con .map
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowsCols });

  /// Limpíamos todo para renderizar nuevamente, se realiza para limpiar movimientos del jugador
  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  //Recorremos las filas y columnas para asi asignar cada posición y Renderizar de una manera mas legible en el codigo.
  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((colum, columIndex) => {
      const emoji = emojis[colum];
      const posX = elementsSize * (columIndex + 1);
      const posY = elementsSize * (rowIndex + 1);

      //Validamos la posición de los emojis o punto de inicio
      if (colum == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (colum == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (colum == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

/// Creamos la función para el movimiento del jugador.toFixed" para limitar numero de decimales.
function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
  }
  /// Variables para validar colision con enemigos. Utilizamos el ".toFixed" para limitar numero de decimales ///
  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });
  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

/// Se crea funcion para pasar de nivel cuando llegemos al "regalito"
function levelWin() {
  console.log("Subiste de nivel");
  level++;
  startGame();
}

function levelFail() {
  console.log("Chocaste con un enemigo");

  lives--;
  console.log(lives);
  if (lives <= 0) {
    level = 0;
    lives = 3;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log("Terminaste el juego!!!");
}
//Creamos el evento para escuchar los movimientos con el teclado.
window.addEventListener("keydown", moveByKeys);
//Creamos los eventos para los movimientos que podamos realizar utilizando el "click".
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);
//Creamos y validamos la funcion para los diferentes movimientos.
function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

////*** Creamos las funciones de los movimientos ***////

function moveUp() {
  console.log("Me quiero mover hacia arriba");

  if (playerPosition.y - elementsSize < elementsSize) {
    console.log("OUT");
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft() {
  console.log("Me quiero mover hacia la izquierda");

  if (playerPosition.x - elementsSize < elementsSize - 1) {
    console.log("OUT");
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log("Me quiero mover hacia la derecha");

  if (playerPosition.x + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log("Me quiero mover hacia abajo");

  if (playerPosition.y + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
