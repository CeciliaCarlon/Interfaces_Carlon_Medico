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
let count = CANT_FICHAS;
let win = false;

function crearJuego(){
    juego = new Juego(c);
    juego.nuevoJuego();
    

    document.getElementById('inputImagenP1').addEventListener("change", nuevasFichasP1);
    document.getElementById('inputImagenP2').addEventListener("change", nuevasFichasP2);
    document.getElementById('selectTamanioTablero').addEventListener('change', cambiarTamanioTablero);//no toma bien el evento
    

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
                //img.addClass('file');
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

    function cambiarTamanioTablero(){
        let valores = document.getElementById('selectTamanioTablero').value;
        let tamanios = valores.split("-");
        console.log(tamanios);
        if(tamanios != null){
            juego.getTablero().setNumberOfRows(tamanios[0]);
            juego.getTablero().setNumberOfCols(tamanios[1]);
            juego.getTablero().drawTablero();
        }
    }

    //Funciones que tienen que ver con la posición del mouse
    function onMouseDown(e){
        isMouseDown = true;
    
        if(lastClickedFigure != null){
            lastClickedFigure = null;
        }

        let clickFig = juego.findClickedFigure(e.layerX, e.layerY);
        if(clickFig != null && !clickFig.getEstado()){
            lastClickedFigure = clickFig;
        }

        juego.drawFichas();
        win = juego.checkGanador(lastClickedFigure);
        if(win){
            console.log("gano un jugador!");
        }
    }

    function onMouseUp(e){
        if(lastClickedFigure != null){
            if(posicionarFicha(e)){
                lastClickedFigure.setEstado(true);
                if(count%2==0){//Esto debería hacerse cuando la ficha ya esta posicionada en el tablero
                    juego.getJugador1().setTurno(false);
                    juego.getJugador2().setTurno(true);
                    count--;
                } else {
                    juego.getJugador1().setTurno(true);
                    juego.getJugador2().setTurno(false);
                    count--;
                }
                isMouseDown = false;
            } else {
                isMouseDown = true;
            }
        }
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

    function posicionarFicha(e){
        if(ultimaColumnaSeleccionada != null){
            ultimaColumnaSeleccionada = null;
        }
        let columnaElegida = juego.getTablero().obtenerColumna(e.layerX, e.layerY);
        if(columnaElegida != null){
            let jugadorActual = 0;
            if(juego.getJugador1().getTurno()){
                jugadorActual = 1;
            } else jugadorActual = 2;
            let casilleroElegido = juego.getTablero().obtenerFila(columnaElegida, jugadorActual); //casillero donde debe ir la ficha
            if(casilleroElegido != null){
                lastClickedFigure.setPosition(casilleroElegido.getPosXParaFicha(), casilleroElegido.getPosYParaFicha());
                juego.drawFichas();
                return true;
            } else return false;
            /*
            if(filaElegida >= 0){
                console.log("Se inserta ficha en la columna "+ columnaElegida + " y fila "+(filaElegida));
                //ultimaColumnaSeleccionada = columnaElegida;
            } else console.log("Ya no se pueden insertar mas fichas en esta columna");*/
        } else return false;
    }
}

document.addEventListener("DOMContentLoaded", crearJuego());
