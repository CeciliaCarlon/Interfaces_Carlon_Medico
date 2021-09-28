"use strict";
//Variables del Canvas
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let width = c.width;
let height = c.height;

//Variables de Eventos
let ultimaFilaSeleccionada = null;
let isMouseDown = false;

//Variables de las Fichas
const CANT_FICHAS = 21;
let fichasP1 = [];
let fichasP2 = [];
let imgP1 = document.getElementById('imgP1');
let imgP2 = document.getElementById('imgP2');
let fichaP1X = 30;
let fichaP1Y = 100;
const MIN_FICHA_P1X = 0;
const MAX_FICHA_P1X = width / 4;
const MAX_FICHA_Y = height;
const MIN_FICHA_P2X = MAX_FICHA_P1X * 3;
const MAX_FICHA_P2X = width;
let fichaP2X = MIN_FICHA_P2X + 30;
let fichaP2Y = 100;

//Variables del Tablero.
const NUMBER_OF_ROWS = 5;
const NUMBER_OF_COLS = 5;


let tablero = new Tablero(ctx, width, height, 6, 7);
tablero.drawTablero();
let player1 = new Jugador("Pepe", imgP1, fichasP1, CANT_FICHAS, fichaP1X, fichaP1Y, MIN_FICHA_P1X, MAX_FICHA_P1X, MAX_FICHA_Y);
player1.addFichas();
let player2 = new Jugador("Juan", imgP2, fichasP2, CANT_FICHAS, fichaP2X, fichaP2Y, MIN_FICHA_P2X, MAX_FICHA_P2X, MAX_FICHA_Y);
player2.addFichas();
window.onload = function () {
    player1.drawFichas();
    player2.drawFichas();
}

//-------- EVENTOS ---------
function onMouseDown(e){
    isMouseDown = true;
    if(ultimaFilaSeleccionada != null){
        ultimaFilaSeleccionada = null;
    }

    let clickFila = tablero.isPointInside(e.layerX, e.layerY);
    
    if(clickFila != null){
        console.log("Se inserta ficha en la fila "+ clickFila);
        //ultimaFilaSeleccionada = clickFila;
    }

}

c.addEventListener('mousedown', onMouseDown, false);
