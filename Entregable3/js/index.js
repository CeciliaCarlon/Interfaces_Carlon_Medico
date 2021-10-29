"use strict";

function inicio(){
    //Me traigo el div del personaje y seteo los valores por defecto
    let personaje = document.getElementById("character");
    let personajeSeleccionado = "01";
    personaje.style.background = "url(img/personaje/personaje" + personajeSeleccionado + "IDLE.png)";

    //Me traigo los botones del perro o gato
    let btnPerro = document.getElementById("perro");
    let btnGato = document.getElementById("gato");

    //Si clickee cualquiera de los dos cambio el jugador
    btnPerro.addEventListener('click', () => {
        personajeSeleccionado = "01";
        btnGato.style.border = "none";
        btnPerro.style.border = "2px white solid";
        personaje.style.background = "url(img/personaje/personaje" + personajeSeleccionado + "IDLE.png)";
    });
    btnGato.addEventListener('click', () => {
        personajeSeleccionado = "02";
        btnPerro.style.border = "none";
        btnGato.style.border = "2px white solid";
        personaje.style.background = "url(img/personaje/personaje" + personajeSeleccionado + "IDLE.png)"
    });

    //Cuando apreto el botón en el div principal empieza el juego
    document.getElementById("empezar").addEventListener('click', () => {

        //Hago invisible el div de comienzo
        let divInicio = document.getElementById("inicio");
        divInicio.style.visibility = 'hidden';
        divInicio.style.display = 'none';

        //Variables
        let divJuego = document.getElementById("juego");
        let personaje = document.getElementById("character");
        let puntaje = document.getElementById("puntaje");
        let arrayFondos = document.getElementsByClassName("fondo");
        let fondos = document.getElementById("fondos");
        let gameOver = document.getElementById("gameOver"); 
        let juego = new Juego(divJuego, personaje, fondos, arrayFondos, puntaje, gameOver, personajeSeleccionado);
        
        //Empieza el juego
        juego.empezarJuego();

        //Función que llama a los eventos cuando se hace keydown sobre una tecla
        document.addEventListener("keydown", function(e){

            //Si el juego todavía no terminó (gané o perdí) el personaje se sigue moviendo 
            if(juego.getisGameOver() == false && juego.getisGameWin() == false){
                switch(e.keyCode){
                    case 38: juego.getJugador().jump(personajeSeleccionado); 
                    break;
                    case 39: juego.getJugador().slide(personajeSeleccionado);
                    break;
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", inicio());