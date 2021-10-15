"use strict";
//Divs
const divPersonalizacion = document.getElementById("divPersonalizacion");
const divJuego = document.getElementById("divJuego");
const divGanador = document.getElementById("divGanador");

//Variables del Canvas
let c = document.getElementById("myCanvas");

//Variables de Eventos
let jugando = false;
let ultimaColumnaSeleccionada = null;
let isMouseDown = false;
let lastClickedFigure = null;

//Variables del Tablero.
let NUMBER_OF_ROWS = 6;
let NUMBER_OF_COLS = 7;
let CANT_FICHAS = NUMBER_OF_COLS * NUMBER_OF_ROWS;
let SIZE = 110;

//Variables del juego
let juego = null;
let count = CANT_FICHAS;
let win = false;
let jugadorActual = 1;
let jugador1 = "Jugador 1";
let jugador2 = "Jugador 2";
let inter = null;
let xValue = 250;
//Variables de las Fichas
let imgP1 = document.getElementById('imgN');
let imgP2 = document.getElementById('imgT');
let MATCH_WIN = 4;

//Variables del TIMER
let reloj = null;
const MS = 1000;

function mostrar(){
    if(jugando){
        divPersonalizacion.style.display = 'none';
        divJuego.style.display = 'block';
        divGanador.style.display = 'none'
        crearJuego();
    } else {
        divPersonalizacion.style.display = 'block';
        divJuego.style.display = 'none';
        divGanador.style.display = 'none'
        mostrarPersonalizacion();
    }
}

function mostrarPersonalizacion(){
    //Eventos
    document.getElementById("jugar").addEventListener("click", function(){ 
        jugando = true;
        if(document.getElementById("nombreJ1").value !== "") jugador1 = document.getElementById("nombreJ1").value;
        if(document.getElementById("nombreJ2").value !== "") jugador2 = document.getElementById("nombreJ2").value;
        mostrar();
    });
    document.getElementById('selectTamanioTablero').addEventListener('change', cambiarTamanioTablero);
    //Fichas jugador 1
    let fichaN = document.getElementById('imgN');
    let fichaH = document.getElementById('imgH');
    let fichaO = document.getElementById('imgO');
    fichaN.addEventListener("click", function(){ imgP1 = fichaN; });
    fichaH.addEventListener("click", function(){ imgP1 = fichaH; });
    fichaO.addEventListener("click", function(){ imgP1 = fichaO; });
    //Fichas jugador 2
    let fichaT = document.getElementById('imgT');
    let fichaK = document.getElementById('imgK');
    let fichaB = document.getElementById('imgB');
    fichaT.addEventListener("click", function(){ imgP2 = fichaT; });
    fichaK.addEventListener("click", function(){ imgP2 = fichaK; });
    fichaB.addEventListener("click", function(){ imgP2 = fichaB; });
    //Función que cambia el tamaño del tablero
    function cambiarTamanioTablero(){
        //Me traigo los valores del select
        let valores = document.getElementById('selectTamanioTablero').value;
        let tamanios = valores.split("-");
        if(tamanios != null){
            //Cambio el numero de columnas, filas y fichas
            NUMBER_OF_COLS = tamanios[1];
            NUMBER_OF_ROWS = tamanios[0];
            CANT_FICHAS = tamanios[1]*tamanios[0];
            //Reasigno match y atributos
            if(tamanios[0]==5){
                MATCH_WIN = 3;
                SIZE = 130;             
            } else if(tamanios[0]==7){
                MATCH_WIN = 5;
                SIZE = 100;
            } else {
                MATCH_WIN = 6;
                SIZE = 92; 
            }
        }
    }
}

function crearJuego(){
    //Creo el timer
    reloj = new Tiempo(20, document.getElementById("countdown"));
    window.setInterval(function(){
        reloj.calcularTiempo();
    },MS);
    //Asigno nombres
    document.getElementById("nombreJugador1").innerHTML = jugador1;
    document.getElementById("nombreJugador2").innerHTML = jugador2;
    document.getElementById("nombreJugador1").style.color = 'black';
    //Creo un nuevo juego
    juego = new Juego(c, CANT_FICHAS, imgP1, imgP2, jugador1, jugador2);
    juego.nuevoJuego();
    //Eventos    
    c.addEventListener('mousedown', onMouseDown, false);
    c.addEventListener('mouseup', onMouseUp, false);
    c.addEventListener('mousemove', onMouseMove, false);
    document.getElementById("reiniciarJuego").addEventListener('click', function(){ 
        jugando = false;
        window.location.reload();
    })
    document.getElementById("reiniciarJuegoTotal").addEventListener('click', function(){ 
        jugando = false;
        window.location.reload();
    })
    //Función que deteca cuando tocas el mouse
    function onMouseDown(e){
        isMouseDown = true;
    
        if(lastClickedFigure != null){
            lastClickedFigure = null;
        }
        //Busco la ficha seleccionada
        let clickFig = juego.findClickedFigure(e.layerX, e.layerY, jugadorActual);
        if(clickFig != null && !clickFig.getEstado()){
            lastClickedFigure = clickFig;
        }

        juego.drawFichas();
    }
    //Función que deteca cuando soltas el mouse
    function onMouseUp(e){
        if(lastClickedFigure != null){
            if(posicionarFicha(e)){
                lastClickedFigure.setEstado(true);
                //Voy cambiando el turno del jugador
                if(count%2==0){
                    juego.getJugador1().setTurno(false);
                    juego.getJugador2().setTurno(true);
                    jugadorActual = 2;
                    document.getElementById("nombreJugador1").style.color = 'white';
                    document.getElementById("nombreJugador2").style.color = 'black';
                    count--;
                } else {
                    juego.getJugador1().setTurno(true);
                    juego.getJugador2().setTurno(false);
                    jugadorActual = 1;
                    document.getElementById("nombreJugador1").style.color = 'black';
                    document.getElementById("nombreJugador2").style.color = 'white';
                    count--;
                }
                isMouseDown = false;
            } else {
                isMouseDown = true;
            }
        }
        //Checkeo si ya hay un ganador
        win = juego.checkGanador(lastClickedFigure);
        //Si hay redirijo la página
        if(win != null){
            divJuego.style.display = 'none';
            divGanador.style.display = 'block';
            let p = document.getElementById("ganadorDelJuego");
            p.innerHTML = 'El ganador del juego es ' + win
        }
    }
    //Función que deteca cuando moves el mouse
    function onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX - 15, e.layerY - 15);
            juego.drawFichas();
        }
    }
    //Función que posiciona las fichas
    function posicionarFicha(e){
        //Si la última columna seleccionada no es null asigno la variable como null
        if(ultimaColumnaSeleccionada != null){
            ultimaColumnaSeleccionada = null;
        }
        //Me traigo la columna
        let columnaElegida = juego.getTablero().obtenerColumna(e.layerX, e.layerY);
        //Checkeo que no sea null
        if(columnaElegida != null){
            //Me traigo el casillero
            let casilleroElegido = juego.getTablero().obtenerFila(columnaElegida, jugadorActual); //casillero donde debe ir la ficha
            //Checkeo que no se null
            if(casilleroElegido != null){
                //Le seteo la posición a la última ficha seleccionada
                lastClickedFigure.setPosition(casilleroElegido.getPosXParaFicha(), casilleroElegido.getPosYParaFicha());
                juego.drawFichas();
                return true;
            } else return false;
        } else return false;
    }
}

document.addEventListener("DOMContentLoaded", mostrar());