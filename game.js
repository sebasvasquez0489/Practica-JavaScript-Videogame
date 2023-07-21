//Variable que almacena la etiqueta canvas
const canvas = document.querySelector("#game");
//Creación del espacio de juego, en este caso 2d
const game = canvas.getContext("2d");
let canvasSize;
let elementsSize;

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

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis["X"], elementsSize, elementsSize * i);
  }
}
