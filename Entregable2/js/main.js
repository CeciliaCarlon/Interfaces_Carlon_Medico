"use strict";
//Variables del Canvas
let c = document.getElementById("myCanvas");

//Variables de Eventos
let ultimaColumnaSeleccionada = null;
let isMouseDown = false;
let lastClickedFigure = null;

//Variables de las Fichas
let imgP1 = document.getElementById('imgP1');
let imgP2 = document.getElementById('imgP2');

//Variables del Tablero.
//const NUMBER_OF_ROWS = 6;//Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
//const NUMBER_OF_COLS = 7;//Por ej: que elija el valor de un select
let NUMBER_OF_ROWS = 6;
let NUMBER_OF_COLS = 7;
const CANT_FICHAS = NUMBER_OF_COLS * NUMBER_OF_ROWS;

let juego = null;

function crearJuego(){
    juego = new Juego(c);
    juego.nuevoJuego();

    document.getElementById('inputImagenP1').addEventListener("change", nuevasFichasP1);
    document.getElementById('inputImagenP2').addEventListener("change", nuevasFichasP2);
    //let valores = document.getElementById('selectTamanioTablero').value;
    //let tamanios = valores.split("-");

    function nuevasFichasP1(e){
        //Luego tomo la URL de la imagen con el target del evento
        let urlImagen = e.target.files[0];
        let reader = new FileReader();
        //Creo una nueva imagen con la URL como titulo
        let imagen = new Image();
        imagen.title = urlImagen.name;
        //Cuando haya cargado el reader
        reader.onload = function(e) {
            //Asigno el resultado del target como el src de la imagen
            imagen.src = e.target.result;
            //Cuando haya cargado la imagen
            imagen.onload = function(){
                //Dibujo las fichas nuevamente
                let img = imagen;
                juego.drawFichasP1(img);
            }
        }
        //Leo los datos binarios y los codigico como la URL de la imagen
        reader.readAsDataURL(urlImagen);
    }

    function nuevasFichasP2(e){
        //Luego tomo la URL de la imagen con el target del evento
        let urlImagen = e.target.files[0];
        let reader = new FileReader();
        //Creo una nueva imagen con la URL como titulo
        let imagen = new Image();
        imagen.title = urlImagen.name;
        //Cuando haya cargado el reader
        reader.onload = function(e) {
            //Asigno el resultado del target como el src de la imagen
            imagen.src = e.target.result;
            //Cuando haya cargado la imagen
            imagen.onload = function(){
                //Dibujo las fichas nuevamente
                let img = imagen;
                juego.drawFichasP2(img);
            }
        }
        //Leo los datos binarios y los codigico como la URL de la imagen
        reader.readAsDataURL(urlImagen);
    }
    /*
    function cambiarTamanioTablero(){
        if(tamanios != null){
            NUMBER_OF_ROWS = tamanios[0];
            NUMBER_OF_COLS = tamanios[1];
            juego.nuevoJuego();
        }
    }*/

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

        juego.drawFichas();
    }

    function onMouseUp(e){
        if(lastClickedFigure != null){
            posicionCorrectaDeFicha(e);
        }
        isMouseDown = false;
    }

    function onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            juego.drawFichas();
        }
        //cambiarTamanioTablero();
    }


    c.addEventListener('mousedown', onMouseDown, false);
    c.addEventListener('mouseup', onMouseUp, false);
    c.addEventListener('mousemove', onMouseMove, false);

    function posicionCorrectaDeFicha(e){
        if(ultimaColumnaSeleccionada != null){
            ultimaColumnaSeleccionada = null;
        }
        let columnaElegida = juego.getTablero().obtenerColumna(e.layerX, e.layerY);
        if(columnaElegida != null){
            let filaElegida = juego.getTablero().obtenerFila(columnaElegida);
            if(filaElegida >= 0){
                console.log("Se inserta ficha en la columna "+ columnaElegida + " y fila "+(1+filaElegida));
                //ultimaColumnaSeleccionada = columnaElegida;
            } else console.log("Ya no se pueden insertar mas fichas en esta columna");
        } else console.log("La ficha no se encuentra en ninguna columna");
    }
}

document.addEventListener("DOMContentLoaded", crearJuego());
