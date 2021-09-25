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
let fichas = [];

//Variables del Tablero.
const NUMBER_OF_ROWS = 5;
const NUMBER_OF_COLS = 5;

function addFichas(){
    while(fichas.length < CANT_FICHAS){
        addFicha();
    }
    drawFichas();
}
function drawFichas(){
    clearCanvas();
    for(let i=0; i<fichas.length; i++){
        fichas[i].draw();
    }
}
function addFicha(){
    let ficha = new Ficha(c, ctx, width, height, CANT_FICHAS);
    fichas.push(ficha);
}
function clearCanvas(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
}

addFichas();

let tablero = new Tablero(ctx, width, height, 6, 7);
tablero.drawTablero();

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
