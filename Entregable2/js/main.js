"use strict";
//Variables del Canvas
let c = document.getElementById("myCanvas");

//Variables de Eventos
let ultimaFilaSeleccionada = null;
let isMouseDown = false;
let lastClickedFigure = null;

//Variables de las Fichas
let imgP1 = document.getElementById('imgP1');
let imgP2 = document.getElementById('imgP2');

//Variables del Tablero.
const NUMBER_OF_ROWS = 6;//Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
const NUMBER_OF_COLS = 7;//Por ej: que elija el valor de un select
const CANT_FICHAS = NUMBER_OF_COLS*NUMBER_OF_ROWS;

function crearJuego(){
    let juego = new Juego(c);
    juego.nuevoJuego();

    //Funciones que tienen que ver con la posición del mouse
    function onMouseDown(e){
        isMouseDown = true;

        if(lastClickedFigure != null){
            lastClickedFigure = null;
        }

        let clickFig = juego.findClickedFigure(e.layerX, e.layerY);
        if(clickFig != null){
            lastClickedFigure = clickFig;
        }

        //drawFigure();
    }

    function onMouseUp(e){
        isMouseDown = false;
    }

    function onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            //drawFigure();
        }
    }

    c.addEventListener('mousedown', onMouseDown, false);
    c.addEventListener('mouseup', onMouseUp, false);
    c.addEventListener('mousemove', onMouseMove, false);
}

document.addEventListener("DOMContentLoaded", crearJuego());

//-------- EVENTOS ---------
/*function onMouseDown(e){
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

c.addEventListener('mousedown', onMouseDown, false);*/

