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

//Variables del juego
let juego = null;
let count = CANT_FICHAS;
let win = false;
let jugadorActual = 1;
let jugador1 = "Jugador 1";
let jugador2 = "Jugador 2";
//Variables de las Fichas
let imgP1 = document.getElementById('imgN');
let imgP2 = document.getElementById('imgT');


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
    //document.getElementById("jugar").addEventListener("click", cambiarLocation.bind("juego"));
    document.getElementById("jugar").addEventListener("click", function(){ 
        jugando = true;
        if(document.getElementById("nombreJ1").value !== "") jugador1 = document.getElementById("nombreJ1").value;
        if(document.getElementById("nombreJ2").value !== "") jugador2 = document.getElementById("nombreJ2").value;
        mostrar();
    });

    //Fichas jugador 1
    let fichaN = document.getElementById('imgN');
    let fichaH = document.getElementById('imgH');
    let fichaO = document.getElementById('imgO');
    //fichaN.addEventListener("click", cambiarFichas.bind("N"));
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
}

function crearJuego(){
    juego = new Juego(c, CANT_FICHAS, imgP1, imgP2, jugador1, jugador2);
    //new Tiempo(2, document.getElementById("countdown"));
    juego.nuevoJuego();

    document.getElementById("nombreJugador1").innerHTML = jugador1;
    document.getElementById("nombreJugador2").innerHTML = jugador2;
    //Eventos
    //document.getElementById('selectTamanioTablero').addEventListener('change', cambiarTamanioTablero);
    //document.getElementById('reiniciarJuego').addEventListener('click', cambiarLocation("index"), fasle);
    c.addEventListener('mousedown', onMouseDown, false);
    c.addEventListener('mouseup', onMouseUp, false);
    c.addEventListener('mousemove', onMouseMove, false);

    document.getElementById("reiniciarJuego").addEventListener('click', function(){ 
        jugando = false;
        mostrar();
    })

    function onMouseDown(e){
        isMouseDown = true;
    
        if(lastClickedFigure != null){
            lastClickedFigure = null;
        }

        let clickFig = juego.findClickedFigure(e.layerX, e.layerY, jugadorActual);
        if(clickFig != null && !clickFig.getEstado()){
            lastClickedFigure = clickFig;
        }

        juego.drawFichas();
        
    }

    function onMouseUp(e){
        if(lastClickedFigure != null){
            if(posicionarFicha(e)){
                lastClickedFigure.setEstado(true);
                if(count%2==0){
                    juego.getJugador1().setTurno(false);
                    juego.getJugador2().setTurno(true);
                    jugadorActual = 2;
                    count--;
                } else {
                    juego.getJugador1().setTurno(true);
                    juego.getJugador2().setTurno(false);
                    jugadorActual = 1;
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
            divGanador.innerHTML = win+" ganó el juego!!!";
        }
    }

    function onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            juego.drawFichas();
        }
    }

    function posicionarFicha(e){
        if(ultimaColumnaSeleccionada != null){
            ultimaColumnaSeleccionada = null;
        }
        let columnaElegida = juego.getTablero().obtenerColumna(e.layerX, e.layerY);
        if(columnaElegida != null){
            let casilleroElegido = juego.getTablero().obtenerFila(columnaElegida, jugadorActual); //casillero donde debe ir la ficha
            if(casilleroElegido != null){
                lastClickedFigure.setPosition(casilleroElegido.getPosXParaFicha(), casilleroElegido.getPosYParaFicha());
                juego.drawFichas();
                return true;
            } else return false;
        } else return false;
    }

    //Función que cambia el tamaño del tablero
    function cambiarTamanioTablero(){
        let valores = document.getElementById('selectTamanioTablero').value;//toma el evento desp de un click
        let tamanios = valores.split("-");
        if(tamanios != null){
            juego.getTablero().setNumberOfRows(tamanios[0]);
            juego.getTablero().setNumberOfCols(tamanios[1]); 
            let total = tamanios[0]*tamanios[1];
            juego.setCantFichas(total);          
            juego.agregarFichas();
            juego.getTablero().drawTablero();
        }
    }
}

//No funciona porque ficha no trae la letra que paso por parametro sino el evento
// function cambiarFichas(ficha){
//     switch(tipo){
//         case "N": 
//             console.log("Ficha actual"+ imgP1.src);
//             imgP1 = fichaN;
//             console.log(fichaN.src);
//             console.log("Ficha cambiada a"+ imgP1.src);
//         break;
//         case "O":
//             console.log("Ficha actual"+ imgP1.src);
//             imgP1 = fichaO;
//             console.log(fichaO.src);
//             console.log("Ficha cambiada a"+ imgP1.src);
//         break;
//     }
// }

document.addEventListener("DOMContentLoaded", mostrar());
