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
      game.fillText(emoji, posX, posY);
      console.log({ row, rowIndex, colum, columIndex });
    });
  });
}
