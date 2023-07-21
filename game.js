//Variable que almacena la etiqueta canvas
const canvas = document.querySelector("#game");
//Creación del espacio de juego, en este caso 2d
const game = canvas.getContext("2d");
//Variables para los botones
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;

//Creamos variable de la posición del jugador el cual sera un objeto.
const playerPosition = {
  x: undefined,
  y: undefined,
};

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
  const map = maps[0];
  //Creamos la variable de las filas del mapa y Limpiamos el string con el metodo ".trim()" y creamos un nuevo arreglo a partir del string con ".split()"
  const mapRows = map.trim().split("\n");
  //Creamos un nuevo array con .map
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowsCols });

  //Recorremos las filas y columnas para asi asignar cada posición y Renderizar de una manera mas legible en el codigo.
  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((colum, columIndex) => {
      const emoji = emojis[colum];
      const posX = elementsSize * (columIndex + 1);
      const posY = elementsSize * (rowIndex + 1);

      //Validamos la posición de los emojis o punto de inicio
      if (colum == "O") {
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({ playerPosition });
      }
      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

//Creamos la función para el movimiento del jugador.
function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

//Creamos el evento para escuchar los movimientos con el teclado.
window.addEventListener("keydown", moveByKeys);
//Creamos los eventos para los movimientos que podamos realizar utilizando el "click".
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);
//Creamos las funciones para los diferentes movimientos.
function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function moveUp() {
  console.log("Me quiero mover hacia arriba");
  playerPosition.y -= elementsSize;
  movePlayer();
}
function moveLeft() {
  console.log("Me quiero mover hacia la izquierda");
}
function moveRight() {
  console.log("Me quiero mover hacia la derecha");
}
function moveDown() {
  console.log("Me quiero mover hacia abajo");
}
